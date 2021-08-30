const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/User')

const app = express()

mongoose.connect('mongodb://127.0.0.1/nodechallenge_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    User.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', { users: result })
        })
        .catch((error) => {
            console.log(error)
        })
})

app.get('/login', (req, res) => {
    res.render('login')
})


// app.get('/add', (req, res) => {
//     const user = new User({
//         username: 'halil',
//         email: 'halil@gmail.com',
//         password: '123456',
//         isAdmin: 'true'
//     })
//     user.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => console.log(error))
// })

// app.get('/all', (req, res) => {
//     User.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// app.get('/getSingle', (req, res) => {
//     User.findById('612cf0d31eca5c31b31a24a5')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })


app.use((req, res) => {
    res.status(404).render('404')
})