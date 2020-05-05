const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const MenusController = require('../controllers/menus.controller');
const router = new express.Router()

router.get('/menus', MenusController.menu_get_all)

module.exports = router