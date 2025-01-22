import Bull from "bull";
import { downloadImage, calculateImagePerimeter, storeResults, sleepRandomTime } from "./imageProcessing.js";
import fs from "fs";
import { Job } from "../models/Job.model.js";
import { StoreMaster } from "../models/StoreMaster.model.js";

const redisConfig = {
  redis: {
    host: "redis-16945.crce179.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 16945,
    password: "GWEC1hn06dUlV5evNAfOKo2Rmlr7friJ",
  },
};

const jobQueue = new Bull("image-processing", redisConfig);

jobQueue.process(async (job) => {
  const { jobId, visits } = job.data;

  try {
    for (const visit of visits) {
      const { store_id, image_url } = visit;

      const store = await StoreMaster.findOne({ StoreID: store_id });
      if (!store) {
        await Job.updateOne(
          { _id: jobId, "visits.store_id": store_id },
          {
            $set: {
              "visits.$.status": "failed",
              "visits.$.error": "Store ID not found",
            },
          }
        );
        continue;
      }

      for (const imageUrl of image_url) {
        try {
          const imagePath = await downloadImage(imageUrl);
          const perimeter = await calculateImagePerimeter(imagePath);
          await sleepRandomTime();
          await storeResults(jobId, store_id, imageUrl, perimeter);
          fs.unlinkSync(imagePath);

          await Job.updateOne(
            { _id: jobId, "visits.store_id": store_id },
            { $set: { "visits.$.status": "completed" } }
          );
        } catch (error) {
          await Job.updateOne(
            { _id: jobId, "visits.store_id": store_id },
            {
              $set: {
                "visits.$.status": "failed",
                "visits.$.error": error.message || "Image processing error",
              },
            }
          );
        }
      }
    }
    await Job.findByIdAndUpdate(jobId, { status: "completed" });
  } catch (error) {
    await Job.findByIdAndUpdate(jobId, { status: "failed" });
    throw error;
  }
});

export { jobQueue };
