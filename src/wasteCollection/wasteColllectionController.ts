import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { wasteCollection } from "./wasteCollectionTypes";
import wasteCollectionModel from "./wasteCollectionModel";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from 'node:fs';

const createWasteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, address, contactNumber } = req.body;

  if (!name || !address || !contactNumber) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }
  let wasteCollectionRequest: wasteCollection;
  const addr= await wasteCollectionModel.findOne({address});
  if(addr){
    return next(createHttpError(400,"Request Already genereated"))
  }
  try {
    wasteCollectionRequest = await wasteCollectionModel.create({
      name,
      address,
      contactNumber,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating User"));
  }
  res.status(201).json({ message: "Request created" });
};

const updateWasteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, address, contactNumber } = req.body;
  const reqId = req.params.reqId;

  const wasteRequest = await wasteCollectionModel.findOne({ _id: reqId });

  if (!wasteRequest) {
    return next(createHttpError(404, "Waste Collection Request Not found"));
  }
  const updateWasteRequest = await wasteCollectionModel.findOneAndUpdate(
    {
      _id: reqId,
    },

    {
      name: name,
      address: address,
      contactNumber: contactNumber
      // uploadImg : completeUploadImg ? completeUploadImg : recycleRequest.uploadImg,
    },
    { new: true }
  );
  res.json(updateWasteRequest);
};

const getSingleWasteRequest = async (req: Request, res: Response, next: NextFunction) => {
  const reqId = req.params.reqId;
  try {
    // const reccp
    const wasteRequest = await wasteCollectionModel.findOne({ _id: reqId });
    if (!wasteRequest) {
      return next(createHttpError(404, "Waste Collection Request Not found"));
    }
    return res.json(wasteRequest);
  } catch (err) {
    return next(createHttpError(500, "Error while getting a waste collection details"));
  }
};

const getAllWasteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recycle = await wasteCollectionModel.find();
    res.json(recycle);

  } catch (err) {
    return next(createHttpError(500, "Error while getting recycle item lists"));
  }
};

const delRequest = async (req: Request, res: Response, next: NextFunction) => {
  const reqWaste = req.params.reqId;
  const recycleRequests = await wasteCollectionModel.findOne({ _id: reqWaste });
  if (!recycleRequests) {
    return next(createHttpError(400, "Not found"));
  }
  await wasteCollectionModel.deleteOne({_id : reqWaste})
  console.log({_id : reqWaste})
  return res.sendStatus(204)
};


export { createWasteRequest ,updateWasteRequest,getSingleWasteRequest, getAllWasteRequest, delRequest};
