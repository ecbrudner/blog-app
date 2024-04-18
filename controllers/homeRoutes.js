const router = require('express').Router();
const { Post, User }= require('../models');
const auth = require('../utils/auth');

//GET all existing blogs
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET a single blog
router.get('/blogpost/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id','username'],
                },
            ],
        });
        //if post user_id equals req.session.user_id, render mypost handlebars
        const post = postData.get({ plain: true });
        if (post.user_id === req.session.user_id) {
            res.render('mypost', {
                post,
                logged_in: req.session.logged_in
            });
        } else {
            res.render('blogpost', {
                post,
                logged_in: req.session.logged_in
            });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});
    

//GET my blogposts
router.get('/dash', auth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//GET signup
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//GET new post
router.get('/newpost', auth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('newpost', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;