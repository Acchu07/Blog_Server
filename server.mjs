import express from 'express';
import userRoutes from './routes/user.mjs';
import passport from 'passport';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(passport.initialize());
app.use('/user',userRoutes)



app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});