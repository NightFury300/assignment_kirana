import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import { Job } from "../models/Job.model.js";
import { jobQueue } from "../services/JobQueue.js"; 
import mongoose from "mongoose";

const SubmitJob = asyncHandler(async (req, res) => {
  const { count, visits } = req.body;

  if (!count || !Array.isArray(visits) || visits.length !== count) {
    throw new APIError(400, "Fields are missing or count does not match visits length");
  }


  const job = new Job({
    status: 'created',
    visits: visits,
  });

  const createdJob = await job.save(); 

  const jobData = {
    jobId: createdJob._id, 
    visits: visits,  
  };

  await jobQueue.add(jobData);

  return res.status(201).json(new APIResponse(201, { job_id: createdJob._id }, "Job created and added to queue for processing"));
});

const GetJobStatus = asyncHandler(async (req, res) => {
    const { jobid } = req.query;
  
    if (!jobid) {
      throw new APIError(400, "Job ID is required");
    }
    if(!mongoose.Types.ObjectId.isValid(jobid))
        throw new APIError(400,"Invalid job id Provided");

    const job = await Job.findById(jobid);
  
    if (!job) {
      throw new APIError(400, "Job ID does not exist");
    }
  
      const failedStores = job.visits
        .filter((visit) => visit.status === "failed")
        .map((visit) => ({
          store_id: visit.store_id,
          error: visit.error || "Unknown error",
        }));
        
        if(failedStores.length!==0){
      return res.status(200).json(
        new APIResponse(
          200,
          {
            status: job.status,
            job_id: jobid,
            error: failedStores,
          },
          "Job Completed with errors"
        )
      );}
    
  else{
    return res.status(200).json(
      new APIResponse(
        200,
        {
          status: job.status,
          job_id: jobid,
        },
        "Job Completed successfully"
      )
    );
}
  });

export { SubmitJob, GetJobStatus };
