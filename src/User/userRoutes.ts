import express from "express"
import { createUser, loginUser } from './userController';

// const {
//   signup,
//   login,
//   verifyToken,
//   getUser,
//   refreshToken,
//   logout,
// } = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/user", verifyToken, getUser);
// router.get("/refresh", refreshToken, verifyToken, getUser);
// router.post("/logout", verifyToken, logout);

export default userRouter;
