import{ Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import { recycleWaste } from "./recycleWasteTypes";
import wasteCollectionModel from "./recycleWasteModel";
import recycleWasteModel from "./recycleWasteModel";

const createRecycleRequest = async (req : Request,res:Response, next : NextFunction) => {
    const {name,address,contactNumber,wasteType} = req.body
    
    if (!name || !address || !contactNumber || !wasteType){
        const error = createHttpError(400,"All fields are required");
        return next(error);
       }
       let recycleRequest : recycleWaste;
       try {
        recycleRequest = await recycleWasteModel.create({
         name, address, contactNumber,wasteType
        });
       
      } catch (err) {
        return next(createHttpError(500,"Error while creating User"))
      }
      res.status(201).json({message : "Recycle Request created"})
}

export {createRecycleRequest}
