const User = require('../models/User')

const getAll = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('user', { users: result })
        })
        .catch((error) => {
            console.log(error)
        })
}

module.exports = {
    getAll
}