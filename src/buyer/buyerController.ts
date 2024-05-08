
import { Request, Response, NextFunction } from 'express';
import RecyclingRequest from './buyerModel';
import { sendSMS } from '../twilio/twilio';
import createHttpError from 'http-errors';


export const acceptRequest = async (req: Request, res: Response, next : NextFunction) => {
    const { id, contactNumber } = req.body;
const reqId = id;
    try {
        
        const request = await RecyclingRequest.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true });
        await sendSMS(contactNumber, 'Your recycling request has been accepted!');
        res.json({ request });
    } catch (error) {
        return next(createHttpError(500,"Error while rejecting request"))
        // res.status(500).json({ _id: reqId._id });
    }
};

export const rejectRequest = async (req: Request, res: Response, next : NextFunction) => {
    const { id, contactNumber } = req.body;
    const reqId = id;

    try {
        const request = await RecyclingRequest.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        await sendSMS(contactNumber, 'Your recycling request has been rejected.');
        res.json({ _id: reqId._id });
    } catch (error) {
        return next(createHttpError(500,"Error while rejecting request"))
        // res.status(500).json({ message: error.message });
    }
};
