const router = require('express').Router()
const {Posts, Users} = require('../models')

router.get('/', async (req, res) => {
    try {
        const postsData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name']
                }
            ]
        })
        const posts = postsData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            // Pass serialized data and session flag into template
        })
    } catch(err) {
        res.status(500).json(err)
    }
})