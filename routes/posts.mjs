import express from 'express';
import passport from 'passport';
import Post from '../db/posts.mjs';

const router = express.Router();

router.get('/all',async (req, res) => {
    //Needs Changes maybe restrict retrival to first 10 based of date? if collection docs exceed beyond x amount
    const allPosts = await Post.find().limit(3);
    res.json(allPosts);
});

router.get('/all/:id',passport.authenticate('jwt', { session: false }),async (req, res) => {
    const allPosts = await Post.find({author:req.user._id});
    res.json(allPosts);
});


router.post('/create',passport.authenticate('jwt', { session: false }), async (req, res) => {
    //ToMaybeDo Add Validators to restrict content or min content
    const { title, content } = req.body;
    await Post.createPost(title,content,req.user._id);

    res.json('Created a new post redirecting to dashboard from react');
});

router.put('/update/:id', async(req, res,next) => {
    const {title,content} = req.body;
    try{
        await Post.findByIdAndUpdate(req.params.id,{title,content})
    }
    catch(err){
        return next(err);
    }
    res.json({message: "UpdatedPost"})
});

router.delete('/delete/:id', async(req, res,next) => {
    try{
        await Post.deleteOne({_id:req.params.id})
    }
    catch(err){
        return next(err);
    }
    res.json(`Delete post with ID ${req.params.id}`);
});

export default router;
