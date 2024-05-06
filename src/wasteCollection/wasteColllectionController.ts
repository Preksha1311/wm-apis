import{ Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { wasteCollection } from "./wasteCollectionTypes";
import wasteCollectionModel from "./wasteCollectionModel";

const createWasteRequest = async (req : Request,res:Response, next : NextFunction) => {
    const {name,address,contactNumber} = req.body
    
    if (!name || !address || !contactNumber){
        const error = createHttpError(400,"All fields are required");
        return next(error);
       }
       let wasteCollectionRequest : wasteCollection;
       try {
        wasteCollectionRequest = await wasteCollectionModel.create({
         name, address, contactNumber,
        });
       
      } catch (err) {
        return next(createHttpError(500,"Error while creating User"))
      }
      res.status(201).json({message : "Request created"})
}

export {createWasteRequest}
