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

const updateRecycleRequest = async (req : Request,res:Response, next : NextFunction) =>{
  const {name,address,contactNumber,wasteType} = req.body;
  const reqId = req.params.reqId;

  const recycleRequest = await recycleWasteModel.findOne({_id: reqId});
  
  if(!recycleRequest) { 
    return next(createHttpError(404,"Recycle Request Not found")) ;
  }

  const files = req.files as {[fieldname : string] : Express.Multer.File[]};

  let completeUploadImg = ""; //final url 
  if(files.uploadImg){
    const filename = files.uploadImg[0].filename;
    const uploadMimeType = files.uploadImg[0].mimetype.split("/").at (-1);
    //send file to cloudinary
    const filePath = path.resolve(__dirname,"../../public/data/uploads" + filename);
    completeUploadImg = filename;

try {
  const uploadResult = await cloudinary.uploader.upload(filePath, {
    filename_override : completeUploadImg,
    folder : "sample-objects",
    format : uploadMimeType,
  });
  console.log('uploadResult' ,uploadResult);
  completeUploadImg = uploadResult.secure_url;
  await fs.promises.unlink(filePath);
  
  
} catch (err) {
  console.log(err);
  return next(createHttpError(400,"Unable to upload image"));
  }
  
}


  const updateRecycleRequest = await recycleWasteModel.findOneAndUpdate(
    {
      _id : reqId,
    },
    
    {
      name : name,
      address : address,
      contactNumber : contactNumber,
      wasteType : wasteType,
      // uploadImg : completeUploadImg ? completeUploadImg : recycleRequest.uploadImg,
    },
      {new : true}
    );
    res.json(updateRecycleRequest);
}

const listBooks = async (req : Request,res:Response, next : NextFunction)=>{
  try {
    const recycle =await recycleWasteModel.find();
    res.json (recycle);

    //pagination in important 
  } catch (err) {
    return next(createHttpError(500, "Error while getting recycle item lists"))
  }
  
}
export {createRecycleRequest, updateRecycleRequest, listBooks}
