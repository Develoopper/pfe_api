const Menu = require("../models/menu.model");

exports.menu_get_all = async (req, res) => {
    try {
        const menus = await Menu.find().select("-_id")
        console.log(menus)
        res.status(200).send(menus)
    } catch (e) {
        res.status(400).send(e.message)
    }
}