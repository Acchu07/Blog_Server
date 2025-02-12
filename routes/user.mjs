import express from 'express';
import users from '../utils/tempUserArray.js';
import { validate, validatedResult } from '../utils/validateSignupLogin.mjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../utils/passportJwT.mjs';


const router = express.Router();


router.post('/sign-up', validate('username'), validate('password'), validatedResult, (req, res) => {
    users.push(req.body)
    res.status(200).json('Path A')
})

router.post('/login', validate('username'), validate('password'), validatedResult, (req, res) => {
    const { username, password } = req.body;
    const found = users.find((value) => value.username === username && value.password === password);
    if (!found) {
        return res.status(401).json({ message: "Auth Failed" })
    }

    const token = jwt.sign({ sub: username }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({
        message: "Auth Passed",
        token: token,
        user: found
    })
})

router.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json("YAY! this is a protected Route")
})

export default router;