const Menu = require("../models/menu.model");

exports.getAll = async (req, res) => {
    try {
        const menus = await Menu.find().select("-_id")
        console.log(menus)
        res.status(200).send(menus)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.getType = async (req, res) => {
    try {
        const menus = await Menu.find({type: req.params.type}).select("-_id")
        console.log(menus)
        res.status(200).send(menus)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

exports.post = async (req, res) => {

}

exports.patch = async (req, res) => {

}

exports.delete = async (req, res) => {

}