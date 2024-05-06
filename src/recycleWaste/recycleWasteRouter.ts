import express from "express"
import { createRecycleRequest, listBooks, updateRecycleRequest } from "./recycleWasteController";
import multer from "multer";
import path from "node:path";
// import { createUser, loginUser } from './userController';

const upload = multer({
    dest: path.resolve(__dirname,'../../public/data/uploads'),
    limits : {fileSize: 3e7} //30MB to the power 7
})
const recycleWasteRouter = express.Router();
//                          router   custom - middleware/ multer   handler
recycleWasteRouter.post("/recycleWaste",upload.fields([
    {name : 'name', maxCount:1},
{name : 'address', maxCount : 1},
{name : 'contactNumber', maxCount : 1},
{name : 'wasteType', maxCount : 1},
{name : 'uploadImg', maxCount : 2}
]), createRecycleRequest);

//dynamic segment  id
recycleWasteRouter.patch("/recycleWaste/:reqId",upload.fields([
    {name : 'name', maxCount:1},
{name : 'address', maxCount : 1},
{name : 'contactNumber', maxCount : 1},
{name : 'wasteType', maxCount : 1},
{name : 'uploadImg', maxCount : 2}
]), updateRecycleRequest);
// wasteCollectionRouter.post("/wasteCollection/recycle", createRecycleRequest);

recycleWasteRouter.get("/recycleWaste",listBooks)

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/user", verifyToken, getUser);
// router.get("/refresh", refreshToken, verifyToken, getUser);
// router.post("/logout", verifyToken, logout);

export default recycleWasteRouter;
