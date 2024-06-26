import express from "express"
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './User/userRoutes';
import wasteCollectionRouter from "./wasteCollection/wasteCollectionRouter";
import recycleWasteRouter from "./recycleWaste/recycleWasteRouter";
import router from "./buyer/buyerRouter";



const app = express()
app.use(express.json()) //json parser
// const port = 3000

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000' // Adjust as per your client server address
}));


app.get("/", (req ,res ,next) => {
  res.json({message : "welcome"});
})

//to tell the app that there exist a router
app.use('/api/users',userRouter);
app.use('/req/wasteCollection',wasteCollectionRouter);
app.use('/req',recycleWasteRouter);
app.use('/buyer',router);
app.use(globalErrorHandler); 

export default app;

/* const express = require("express");
const User = require("../User/UserModel.js")
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({ credentials: true, origin: `http://localhost:${process.env.PORT}` }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
mongoose
  .connect(
    `mongodb+srv://user:${process.env.MONGODB_PASSWORORD}@cluster0.wr7oaup.mongodb.net/`
  )
  .then(() => {
    app.listen(5050);
    console.log("Database is connected! Listening to localhost 4000");
  })
  .catch((err) => console.log(err));

  export default app

  */
