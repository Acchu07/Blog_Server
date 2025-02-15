import express from 'express';
import passport from 'passport';
import connectMongoDB from './db/connectMongoDB.mjs';
import cors from 'cors';

import userRoutes from './routes/user.mjs';
import postRoutes from './routes/posts.mjs'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/user',userRoutes)
app.use('/posts',postRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectMongoDB();
});