const router = require('express').Router()
const { Post } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', async(req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_test,
            // title: req.session.title,
            // post: req.session.post
        })
        console.log(newPost)
        res.status(200).json(newPost)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                
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

//UPDATE DEL FUNCTIONALITY

router.put('/:id', withAuth, async(req, res) => {
    try {
    const postData = await Post.update({
        title: req.body.title,
        post: req.body.post
    },
    {
        where: {
            id: req.params.id
        }
    })
    if(!postData){
        res.status(404).json({message: 'No posts were found with that ID'})
        return
    }
    res.status(200).json(postData)
} catch (err) {
    res.status(500).json(err)
}
})


module.exports = router