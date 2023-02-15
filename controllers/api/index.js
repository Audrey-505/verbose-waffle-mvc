const router = require('express').Router()
const postsRoutes = require('./postsRoutes')
const userRoutes = require('./userRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/users', userRoutes)
router.use('/posts', postsRoutes)
router.use('/comments', commentRoutes)


module.exports = router