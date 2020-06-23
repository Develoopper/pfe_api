const express = require('express')
const auth = require('../middleware/auth')
const MenuController = require('../controllers/menus.controller');
const router = new express.Router()

router.get('/menus', auth, MenuController.getAll)
router.get('/menus/:type', MenuController.getType)

router.post('/menus', MenuController.post)

router.patch('/menus/:id', auth, MenuController.patch)

router.delete('/menus/:id', auth, MenuController.delete)

module.exports = router