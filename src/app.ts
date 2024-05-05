import express,{ Request, Response, NextFunction} from "express"
import { HttpError } from "http-errors";
import { config } from './config/config';
const app = express()
// const port = 3000

app.get("/", (req ,res ,next) => {
  res.json({message : "welcome"});
})

app.use((err: HttpError ,req:Request,res:Response ,next:NextFunction) =>{
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message : err.message,
    errorStack : config.env === 'development' ? err.stack : "",
  })
})

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
