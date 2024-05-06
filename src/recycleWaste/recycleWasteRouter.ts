import express from "express"
import { createRecycleRequest } from "./recycleWasteController";
// import { createUser, loginUser } from './userController';


const recycleWasteRouter = express.Router();

recycleWasteRouter.post("/recycleWaste", createRecycleRequest);
// wasteCollectionRouter.post("/wasteCollection/recycle", createRecycleRequest);


// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/user", verifyToken, getUser);
// router.get("/refresh", refreshToken, verifyToken, getUser);
// router.post("/logout", verifyToken, logout);

export default recycleWasteRouter;
