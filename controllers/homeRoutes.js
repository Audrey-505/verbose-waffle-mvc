const router = require('express').Router()
const {Post, User} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                }
            ]
        })
        // Serialize data so the template can read it
        const posts = postsData.map((post) => post.get({ plain: true }))
    
        res.render('homepage', {
            ...posts,
            logged_in: req.session.logged_in
            // Pass serialized data and session flag into template
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/post/:id', async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                }
            ]
        })
        const post = postData.get({ plain: true })
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/profile', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.username, {
            attributes: { exclude: ['password']},
            include: [{model: Post}]
        })

        const user = userData.get({ plain: true })
        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/login', async(req, res) => {
    if(req.session.logged_in){
        res.redirect('/profile')
        return
    }
    res.render('login')
})

module.exports = router