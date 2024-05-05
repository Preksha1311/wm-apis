import { User } from './userTypes';
const mongoose = require("mongoose");

const userSchema = new mongoose Schema<User>({
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
export default mongoose.model<User> ('User', userSchema);

// users
