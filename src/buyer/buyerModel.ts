import mongoose from 'mongoose';
import { IRecyclingRequest } from './buyerTypes';


const recyclingRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Pending', 'Accepted', 'Rejected'], 
        default: 'Pending' 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const RecyclingRequest = mongoose.model<IRecyclingRequest & mongoose.Document>('RecyclingRequest', recyclingRequestSchema);

export default RecyclingRequest;
