import {config as conf} from "dotenv";
conf();

const _config = {
    port : process.env.PORT,
    databaseUrl : process.env.MONGO_CONNECTION_STRING,
    env : process.env.NODE_ENV,
    jwtSecret : process.env.JWT_SECRET,
    cloudinaryCloud : process.env.CLOUDINARY_CLOUD,
    cloudinaryApiKey : process.env.CLOUDINARY_APIKEY ,
    cloudinarySecret : process.env.CLOUDINARY_APISECRET
};

export const config = Object.freeze(_config);
