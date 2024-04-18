const router = require('express').Router();
const { Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

//post new blog
router.post('/', auth, async (req, res) => {
    try {
        console.log("received post request");
        console.log("request body:",req.body);
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log("new post created:",newPost);

        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

//update blog post
router.put('/:id', auth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete blog post
router.delete('/:id', auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post new comment
router.post('/posts/:post_id/comments', auth, async (req, res) => {
    try {
        console.log("received post request", req.body);

        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.post_id,
        });

        console.log("new comment created:",newComment);

        res.status(200).json(newComment);
    } catch (err) {
        console.error('error posting comment:', err);
        res.status(500).json({ message: 'Failed to post comment' });
    }
});

module.exports = router;


