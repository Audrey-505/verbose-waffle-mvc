const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async(req, res) => {
    try {
        const newUser = await User.create(req.body)
        req.session.save(() => {
            req.session.user_test = newUser.id
            req.session.logged_in = true

            res.status(200).json(newUser)
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/login', async(req, res) => {
    try {
        const newUser = await User.findOne({
            where: {email: req.body.email}
        })

        if(!newUser){
            res.status(404).json({message: 'incorrect email or password on file'})
            return
        }

        const validPassword = await newUser.checkPassword(req.body.password)
        if(!validPassword){
            res.status(404).json({message: 'incorrect email or password on file'})
            return
        }

        req.session.save(() => {
            req.session.user_test = newUser.id
            req.session.logged_in = true
            console.log(req.session)

            res.json({ user: newUser, message: 'You are now logged in'})
        })
    } catch (err){
        res.status(500).json(err)
    }
})

router.post('/logout', (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(500).end()
    }
})

module.exports = router