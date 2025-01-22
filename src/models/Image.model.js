import mongoose from "mongoose";
const imageResultSchema = new mongoose.Schema({
  job_id: {
    type: String,
    required: true
  },
  store_id: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  perimeter: {
    type: Number,
    required: true
  },
  processed_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  error: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export const ImageResult = mongoose.model('ImageResult', imageResultSchema);
