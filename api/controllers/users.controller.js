const User = require("../models/user.model");

exports.user_get_avatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar)
            throw new Error()
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
}

exports.user_logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.user_get_me = async (req, res) => {
    res.status(200).send(req.user)
}

exports.user_create = async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({ token });
        await user.save();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.user_login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.user_edit_my_avatar = async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send(req.user)
}

exports.user_update = async (req, res) => {
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

exports.user_delete = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send()
    } catch (e) {
        res.status(400).send()
    }
}