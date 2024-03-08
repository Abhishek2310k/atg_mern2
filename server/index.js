import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {UserRouter} from './routes/user.js';
import { PostRouter } from './routes/post.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true
}));



app.use(cookieParser())
app.use('/auth',UserRouter);

app.use('/post',PostRouter);

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

app.listen(4500,() => {
    console.log("server has started on port number",4500);
})