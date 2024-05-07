import app from "../app";

// In your server setup code
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000' // Adjust as per your client server address
}));
