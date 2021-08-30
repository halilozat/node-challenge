const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

UserSchema.statics.login = async function (username, password) {
    const user = await this.findOne({username})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        } else {
            throw Error('Password is wrong!')
        }
    } else {
        throw Error('User not found!')
    }
}

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = mongoose.model('User', UserSchema)
