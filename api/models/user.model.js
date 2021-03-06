const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Menu = require('./menu.model');

const userSchema = new mongoose.Schema({
    tel: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
    token: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    commandes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commandes'
    }],
    favoris: [Menu.schema]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.token
    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, 'tokenKey')
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if (!user)
            throw new Error()
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            throw new Error()
        return user;
    } catch (e) {
        return "Unable to login"
    }
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    if (await User.findOne({ email : user.email }))
        next(new Error("Email existe dejà"));
    else
        next();
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Tasks.remove({ owner: require.user._id })
    next();
})

const User = mongoose.model('user', userSchema)

module.exports = User

// email: {
//     type: String,
//     required: true,
//     validate(value) {
//         if (!validator.isEmail(value)) {
//             throw new Error('Email is in valid')
//         }
//     },
//     trim: true
// },