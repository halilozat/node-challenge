const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')


const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, 'secret_key', { expiresIn: maxAge })
}


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((result) => {
            res.redirect('/login')
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
})


module.exports = router;