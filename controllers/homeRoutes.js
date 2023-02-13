const router = require('express').Router()
const {Post, User, Comment} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'post',
                'date',
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email']
                    }
                }
            ]
        })
        // Serialize data so the template can read it
        const posts = postsData.map((post) => post.get({ plain: true }))
        res.render('homepage', {
            posts,
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
            attributes: [
                'id',
                'title',
                'post',
                'date'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email']
                    }
                }
            ]
        })
        const post = postData.get({ plain: true })
        res.render('posts', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/createpost', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_test, {
            attributes: { exclude: ['password']},
            include: [{model: Post, attributes: ['id', 'title', 'post', 'user_id', 'date']}],
        })

        console.log(userData)
        const user = userData.get({ plain: true })
        console.log(user)
        res.render('createpost', {
            ...user,
            logged_in: true
        })
        //res.render('createpost')
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.get('/editpost/:id', async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'title',
                'post',
                'date'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email']
                    }
                }
            ]
        })
        const post = postData.get({ plain: true })
        res.render('editpost', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//TESTING 
router.get('/editcomment/:id', async(req, res) => {
    try {
        const postData = await Comment.findByPk(req.params.id, {
            attributes: [
                'id', 
                'comment_text',
                'post_id', 
                'user_id', 
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Post,
                    attributes: ['id','title','post','date'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email']
                    }
                }
            ]
        })
        const comment = postData.get({ plain: true })
        res.render('editcomment', {
            comment,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/addcomment/:id', withAuth, async(req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            attributes: [
                'id', 
                'comment_text',
                'post_id', 
                'user_cid', 
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'email']
                },
                {
                    model: Post,
                    attributes: ['id','title','post','date'],
                    include: {
                        model: User,
                        attributes: ['id','name', 'email'],
                        model: Comment,
                        attributes: ['id', 'comment_text','post_id','user_cid','created_at']
                    }
                }
            ]
        })
        const comment = commentData.get({ plain: true })
        console.log(comment)
        res.render('addcomment', {
            ...comment,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// router.post('/addcomment', async(req, res) => {
//     try {
//         const newCom = await Comment.create({
//             ...req.body,
//             user_id: req.session.user_test,
//             post_id: req.params.id
//             // title: req.session.title,
//             // post: req.session.post
//         })
//         console.log(newCom)
//         res.status(200).json(newCom)
//     } catch(err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// })

//BELOW IS WORKING 

router.get('/login', async(req, res) => {
    if(req.session.logged_in){
        res.redirect('/createpost')
        return
    }
    res.render('login')
})

module.exports = router