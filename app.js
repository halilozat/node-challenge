const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')

const app = express()

mongoose.connect('mongodb://127.0.0.1/nodechallenge_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { users: result })
        })
        .catch((error) => {
            console.log(error)
        })
})

app.use('/', authRoutes)


app.use((req, res) => {
    res.status(404).render('404')
})