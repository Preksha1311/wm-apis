import { User } from './userTypes';
import mongoose from "mongoose"

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
},{
  timestamps : true
});
//users collection
export default mongoose.model<User>('User', userSchema, 'authors');

// users
