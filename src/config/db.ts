import mongoose from "mongoose"
import { config } from './config';
import app from '../app';


const dbConnect = async () => {
    try {
        mongoose.connect(config.databaseUrl as string)
        mongoose.connection.on("connected",()=>{
            console.log("connected to the database successfully");
            
        }),
        //for future db error
        mongoose.connection.on("error",(err)=>{
            console.log("Error in connection to DB",err);
        })
    } catch (err) {
        console.log("Failed to connect to databse ",err);
        process.exit(1);
    }
}

export default dbConnect;
