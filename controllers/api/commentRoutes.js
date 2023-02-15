const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')


router.put('/:id', withAuth, async(req, res) => {
    try {
    const commentData = await Comment.update({
        ...req.body,
        user_id: req.session.user_test,
        post_id: req.params.id
    },
    {
        where: {
            id: req.params.id
        }
    })
    if(!commentData){
        res.status(404).json({message: 'No comments were found with that ID'})
        return
    }
    res.status(200).json(commentData)
} catch (err) {
    res.status(500).json(err)
}
})



module.exports = router