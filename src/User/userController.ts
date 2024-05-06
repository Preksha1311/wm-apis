import {Response,Request,NextFunction} from 'express';
import createHttpError from "http-errors"
import bcrypt from "bcrypt";
import userModel from "./userModel"
import { config } from '../config/config';
import {sign} from "jsonwebtoken"
import { HttpError } from 'http-errors';
import { User } from './userTypes';
const createUser = async (req : Request,res:Response, next : NextFunction) => {
  const {name, email, password} = req.body; //get destructure 
   if (!name || !email || !password){
    const error = createHttpError(400,"All fields are required");
    return next(error);
   }

  //validation
  // db call

  try {
    const user = await userModel.findOne({email : email});
    if (user) {
      const error = createHttpError(400,"User Exists");
      return next(error);
   }
  } catch (err) {
    return next(createHttpError(500,"Error while getting User"))
  }
  
  // doc or null
  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser : User;
try {
  newUser = await userModel.create({
   name, email, password : hashedPassword,
  });
 
} catch (err) {
  return next(createHttpError(500,"Error while creating User"))
}

 // token generation JWT
 try {
     const token = sign({ sub: newUser._id },config.jwtSecret as string ,{ expiresIn : '7d' }) //sync function
     //process
     //response
     res.status(201).json( {accesstoken : token})
  
 } catch (err) {
  return next(createHttpError(500,"Error while signing JWT token"))
 }
};
const loginUser = async (req : Request,res:Response, next : NextFunction) => {
  const {email, password} = req.body;
  if(!email || !password) { 
    return next(createHttpError(400, "all fields are required"))
  }
 
    const user= await userModel.findOne({email});
    if(!user) {
      return next(createHttpError(400,"User not found"));
    }

  const isMatch = await bcrypt.compare(password, user.password )
  if(!isMatch){
    return next(createHttpError(400,"Username or password is incorrect"))
  }

  //new accessstoken generate
  const token = sign({ sub: user._id },config.jwtSecret as string ,{ expiresIn : '7d' }) //sync function
  res.status(201).json( {accesstoken : token})

  // res.json({accessToken :})
  
}
export { createUser,loginUser };
/*const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    location
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Email / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35s",
  });

  console.log("Generated Token\n", token);

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ user });
};
const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
*/
