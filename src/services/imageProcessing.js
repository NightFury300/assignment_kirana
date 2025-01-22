import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imageSize from 'image-size';
import { ImageResult } from '../models/Image.model.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const tempDirectory = path.join(dirname, 'temp');
if (!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory); 
}

async function downloadImage(url) {
    try {
        const response = await fetch(url); 
        const buffer = await response.arrayBuffer();
        
        const fileName = path.basename(url);
        const filePath = path.join(tempDirectory, fileName); 
        
        fs.writeFileSync(filePath, Buffer.from(buffer));
        
        return filePath;
    } catch (error) {
        console.error('Error downloading image:', error);
        throw error;
    }
};

function calculateImagePerimeter(imagePath) {
  try {
      const dimensions = imageSize(imagePath);
      const { width, height } = dimensions;

      if (!width || !height) {
          throw new Error("Invalid image dimensions");
      }

      const perimeter = 2 * (width + height);
      return perimeter;
  } catch (error) {
      throw new Error(`Failed to calculate perimeter: ${error.message}`);
  }
}

async function storeResults (jobId, storeId, imageUrl, perimeter) {
    try {
      const existingResult = await ImageResult.findOne({ job_id: jobId, store_id: storeId, image_url: imageUrl });

      if (existingResult) {
        existingResult.perimeter = perimeter;
        existingResult.status = 'completed';
        existingResult.error = null;
        existingResult.processed_at = new Date();
        await existingResult.save();
      } else {
        const newResult = new ImageResult({
          job_id: jobId,
          store_id: storeId,
          image_url: imageUrl,
          perimeter: perimeter,
          status: 'completed',
        });
        await newResult.save();
      }
  
     
    } catch (error) {
      console.error(`Error storing results for job ${jobId}, store ${storeId}, image ${imageUrl}:`, error);
  
      await ImageResult.updateOne(
        { job_id: jobId, store_id: storeId, image_url: imageUrl },
        { status: 'failed', error: error.message }
      );
  
      throw error; 
    }
};
   
function sleepRandomTime() {
    return new Promise(resolve => {
      const sleepTime = Math.random() * (0.4 - 0.1) + 0.1;  
      setTimeout(resolve, sleepTime * 1000);  
    });
};

export {calculateImagePerimeter,storeResults,downloadImage,sleepRandomTime}