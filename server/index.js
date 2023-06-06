import express from 'express';
import mongoose from 'mongoose';
import fileUpLoad from 'express-fileupload'
import { config } from 'dotenv';
import rootRoute from './routes/index.js';
import cors from 'cors';
config();


const app = express();

const PORT = process.env.PORT;



app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))
app.use(fileUpLoad())
app.use(rootRoute);

const main = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/social-network');

        app.listen(PORT, () =>
            console.log(`Server is started on ${PORT} port`)
        );
    } catch (err) {
        console.log('Server was not started ', err);
    }
};

main();
