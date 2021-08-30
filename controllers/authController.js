const User = require('../models/User')
const jwt = require('jsonwebtoken')


const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, 'secret_key', { expiresIn: maxAge })
}

const getLogin = (req, res) => {
    res.render('login')
}

const postLogin = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

const getRegister = (req, res) => {
    res.render('register')
}

const postRegister = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then((result) => {
            res.redirect('/login')
        })
        .catch((error) => {
            console.log(error)
        })
}

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}


module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
}
