import{ Request, Response, NextFunction } from "express"
import fs from "node:fs"
import createHttpError from "http-errors"
import wasteCollectionModel from "./recycleWasteModel";
import recycleWasteModel from "./recycleWasteModel";
import { recycleWaste } from './recycleWasteTypes';
import cloudinary from "../config/cloudinary";
import multer from 'multer';
import path from "node:path";
import { data } from "autoprefixer";

const createRecycleRequest = async (req : Request,res:Response, next : NextFunction) => {
    const {name,address,contactNumber,wasteType} = req.body
    
    // if (!name || !address || !contactNumber || !uploadImg){
    //     const error = createHttpError(400,"All fields are required");
    //     return next(error);
    //    }
    //    let recycleRequest : recycleWaste;
    //    try {
    //     recycleRequest = await recycleWasteModel.create({
    //      name, address, contactNumber,uploadImg
    //     });
       
    //   } catch (err) {
    //     return next(createHttpError(500,"Error while creating User"))
    //   }
    console.log('files',req.files);
    const files = req.files as {[fieldname : string] : Express.Multer.File[]};
    const coverImageMimeType = files.uploadImg[0].mimetype.split('/').at(-1);
    const filename = files.uploadImg[0].filename;

    const filePath = path.resolve(__dirname,'../../public/data/uploads',filename)
   
   try {
     const uploadResult = await cloudinary.uploader.upload(filePath,{
       filename_override : filename,
       folder : 'sample-objects',
       format : coverImageMimeType
     });
     console.log('uploadResult' ,uploadResult);

     const newImage = await recycleWasteModel.create ({
      name, address, contactNumber,wasteType, uploadImg: uploadResult.secure_url,
     });

     //delete temp files
     await fs.promises.unlink(filePath);
     res.status(201).json({id : newImage._id})
     
   } catch (err) {
    console.log(err)
    return next(createHttpError(500,'Error while uploading the files.'))
   }



}

export {createRecycleRequest}
