const express = require('express');
const MenusController = require('../controllers/menus.controller');
const router = new express.Router()

router.get('/menus', MenusController.menu_get_all)

module.exports = router