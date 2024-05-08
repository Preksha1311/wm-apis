import mongoose from "mongoose"
import { recycleWaste } from './recycleWasteTypes';

const recycleWasteModel = new mongoose.Schema<recycleWaste>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength:10,
  },
  wasteType : {
    type: String,
    required: true,
  },
  uploadImg : {
    type: String,
    required: true,
  }
},{
  timestamps : true
});
//users collection
export default mongoose.model<recycleWaste>('recycleWasteModel', recycleWasteModel, 'recycleWasteRequests');

// users
