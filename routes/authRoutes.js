const router = require('express').Router()
const User = require('../models/User')


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    
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

})


module.exports = router;