import express from "express"
import { createWasteRequest } from "./wasteColllectionController";
// import { createUser, loginUser } from './userController';


const wasteCollectionRouter = express.Router();

wasteCollectionRouter.post("/wasteCollection", createWasteRequest);
// wasteCollectionRouter.post("/wasteCollection/recycle", createRecycleRequest);


// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/user", verifyToken, getUser);
// router.get("/refresh", refreshToken, verifyToken, getUser);
// router.post("/logout", verifyToken, logout);

export default wasteCollectionRouter;
