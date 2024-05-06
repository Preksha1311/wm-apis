import mongoose from "mongoose"
import { wasteCollection } from './wasteCollectionTypes';

const wasteCollectionModel = new mongoose.Schema<wasteCollection>({
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
  },
},{
  timestamps : true
});
//users collection
export default mongoose.model<wasteCollection>('wasteCollectionModel', wasteCollectionModel, 'wasteRequests');

// users
