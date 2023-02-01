const router = require('express').Router()
const { Posts } = require('../../models')

router.post('/', async(req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            username: req.session.username
        })
        res.status(200).json(newPost)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.params.id,
                username: req.session.username
            }
        })
        if(!postData){
            res.status(404).json({ message: 'No posts with that ID were found' })
            return
        }
        res.status(200).json(postData)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router