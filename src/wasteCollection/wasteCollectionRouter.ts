import express from "express"
import { createWasteRequest, delRequest, getAllWasteRequest, getSingleWasteRequest, updateWasteRequest } from "./wasteColllectionController";
// import { createUser, loginUser } from './userController';


const wasteCollectionRouter = express.Router();

wasteCollectionRouter.post("/create", createWasteRequest);
wasteCollectionRouter.get("/getAll", getAllWasteRequest);
wasteCollectionRouter.get("/collectWaste/:reqId", getSingleWasteRequest);
wasteCollectionRouter.delete("/deleteRequest/:reqId", delRequest);
wasteCollectionRouter.patch("/updateRequest/:reqId", updateWasteRequest);



// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/user", verifyToken, getUser);
// router.get("/refresh", refreshToken, verifyToken, getUser);
// router.post("/logout", verifyToken, logout);

export default wasteCollectionRouter;
