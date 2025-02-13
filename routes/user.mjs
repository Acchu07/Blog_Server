import express from 'express';
import users from '../utils/tempUserArray.js';
import { validate, validatedResult } from '../utils/validateSignupLogin.mjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../utils/passportJwT.mjs';
import userClass from '../db/usersDB.mjs';

const router = express.Router();


router.post('/sign-up', validate('username'), validate('password'), validatedResult, async (req, res) => {
    const {username, password} = req.body
    if(await userClass.searchUser(username)){
        return res.json('userPresent');
    };
    await userClass.createUser(username,password);
    res.status(200).json('Created User In DB')
})

router.post('/login', validate('username'), validate('password'), validatedResult, async(req, res) => {
    const { username } = req.body;
    const found = await userClass.searchUser(username);
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