import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import users from './tempUserArray.js';
import userClass from '../db/usersDB.mjs';

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    
    const user = await userClass.searchUser(jwt_payload.sub);
    if(user){
        return done(null,user);
    }
    return done(null,false);

}));
