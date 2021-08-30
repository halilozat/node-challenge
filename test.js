const mongoose = require('mongoose')

const User = require('./models/User')

mongoose.connect('mongodb://127.0.0.1/nodechallenge_test_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

User.create({
    username:'halil',
    email: 'halil@gmail.com',
    password: '123456'
}, (error, user) => {
    console.log(error, user)
}
)