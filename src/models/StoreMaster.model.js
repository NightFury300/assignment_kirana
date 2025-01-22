import mongoose from "mongoose" 

const storeMasterSchema = new mongoose.Schema({
  StoreID: {
    type: String,
    required: true,
  },
  StoreName: {
    type: String,
    required: true
  },
  AreaCode: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const StoreMaster = mongoose.model('StoreMaster', storeMasterSchema);
