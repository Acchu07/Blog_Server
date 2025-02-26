import express from 'express';
import users from '../utils/tempUserArray.js';
import { validate, validatedResult } from '../utils/validateSignupLogin.mjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../utils/passportJwT.mjs';
import userClass from '../db/usersDB.mjs';
import bcrypt from 'bcryptjs';

const router = express.Router();


router.post('/sign-up', validate('username'), validate('password'), validatedResult, async (req, res) => {
    const {username, password} = req.body
    if(await userClass.searchUser(username)){
        return res.json('userPresent');
    };
    await userClass.createUser(username,bcrypt.hashSync(password,10));
    res.status(200).json('Created User In DB. Please login with the created UserName and Pass')
})

router.post('/login', validate('username'), validate('password'), validatedResult, async(req, res) => {
    const { username, password } = req.body;
    const found = await userClass.searchUser(username);
    if (!found) {
        return res.status(401).json({ message: "Auth Failed user doesnt exist" })
    }
    
    if(!bcrypt.compareSync(password,found.password)){
        return res.status(401).json({ message: "Auth Failed due to pass" })
    }
    
    // .cookie('JwTAccessToken',`Bearer ${token}`,{httpOnly:true})
    const token = jwt.sign({ sub: username }, process.env.ACCESS_TOKEN_SECRET);
    return res
    .status(200)
    .cookie('JwTAccessToken',`Bearer ${token}`,{httpOnly:true,secure:true,sameSite:'None'})
    .json({
        message: "Auth Passed",
        user: username
    })
})

router.get("/authenticate", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({hasToken:true,message:'User Is Logged IN', user: req.user._id})
})

router.post('/logout', (req, res) => {
    res
    .status(200)
    .clearCookie('JwTAccessToken')
    .json({ message: "Logged out successfully" });
});

export default router;