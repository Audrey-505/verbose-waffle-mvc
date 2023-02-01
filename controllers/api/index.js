const router = require('express').Router()
const postsRoutes = require('./postsRoutes')
const userRoutes = require('./userRoutes')

router.use('/users', userRoutes)
router.use('/posts', postsRoutes)

module.exports = router