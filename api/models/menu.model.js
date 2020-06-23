const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tasks = require('./tasks');

const menuSchema = new mongoose.Schema({
    libellee: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    prix: {
        type: Number,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    duree: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

menuSchema.pre('remove', async function (next) {
    const menu = this
    await Tasks.remove({ owner: require.menu._id })
    next();
})

const Menu = mongoose.model('menu', menuSchema)

module.exports = Menu