import express from 'express';
import passport from 'passport';
import connectMongoDB from './db/connectMongoDB.mjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.mjs';
import postRoutes from './routes/posts.mjs'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(passport.initialize());
app.use(cookieParser());

app.use('/user',userRoutes)
app.use('/posts',postRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//To Do - Easy to look at code instead of multiple try catch blocks
app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).json({message: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectMongoDB();
});