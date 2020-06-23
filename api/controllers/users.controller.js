const User = require("../models/user.model");

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}    

exports.getMe = async (req, res) => {
    res.status(200).send(req.user)
}

exports.post = async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        // user.tokens = user.tokens.concat({ token });
        user.token = token;
        await user.save();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.patch = async (req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const keys = Object.keys(req.body)
    const isUpdationValid = keys.every(key => allowedUpdates.includes(key))
    if (!isUpdationValid)
        res.status(400).send()
    try {
        keys.forEach(update => req.user[update] = req.body[update])
        await req.user.save();
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send()
    }
}

exports.delete = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
}