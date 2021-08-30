const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

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
app.use(cookieParser())


app.get('*', checkUser)
app.use('/', authRoutes)
app.use('/',requireAuth, userRoutes)


app.use((req, res) => {
    res.status(404).render('404')
})