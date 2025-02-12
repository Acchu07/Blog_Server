import express from 'express';
import users from './utils/tempUserArray.js';
import {validate,validatedResult} from './utils/validateSignupLogin.mjs';


const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {

    res.send('Hello World!');
});


app.post('/sign-up',validate('username'),validate('password'),validatedResult, (req, res) => {
    users.push(req.body)
    res.status(200).send('Path A')
})

app.post('/login', (req, res) => {

    const found = users.find((value)=> value.username === req.body.username);
    console.log(found);
    res.send('Path B')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});