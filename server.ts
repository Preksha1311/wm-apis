import app from './src/app';
import { config } from './src/config/config';
import dbConnect from './src/config/db';
const dotenv =require ("dotenv")
dotenv.config()
const startServer =  async() =>  {

    await dbConnect();
    const port = config.port || 3000;

    app.listen(port, ()=>{
        console.log(`Listening on port : ${port}`);
    });
}

startServer();
