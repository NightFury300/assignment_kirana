import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['created', 'ongoing', 'completed', 'failed'],
    default: 'created'
  },
  submitted_at: {
    type: Date,
    default: Date.now
  },
  completed_at: {
    type: Date,
    default: null
  },
  visits: [{
    store_id: {
      type: String,
      required: true
    },
    image_url: [{
      type: String,
      required: true
    }],
    visit_time: {
      type: String,
      required: true
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
  }]
}, {
  timestamps: true
});

export const Job = mongoose.model('Job', jobSchema);
