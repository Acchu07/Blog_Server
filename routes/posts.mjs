import express from 'express';
import passport from 'passport';
import Post from '../db/posts.mjs';

const router = express.Router();

router.get('/all',async (req, res) => {
    //Needs Changes maybe restrict retrival to first 10 based of date? if collection docs exceed beyond x amount
    const allPosts = await Post.find();
    console.log(allPosts)
    res.json(allPosts);
});


router.post('/create',passport.authenticate('jwt', { session: false }), async (req, res) => {
    //ToMaybeDo Add Validators to restrict content or min content
    const { title, content } = req.body;
    await Post.createPost(title,content,req.user._id);

    res.send('Created a new post redirecting to dashboard from react');
});

router.put('/update/:id', (req, res) => {
    res.send(`Update post with ID ${req.params.id}`);
});

router.delete('/delete/:id', (req, res) => {
    res.send(`Delete post with ID ${req.params.id}`);
});

export default router;