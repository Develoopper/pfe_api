const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const UsersController = require('../controllers/users.controller');
const router = new express.Router()

router.get('/users/logout', auth, UsersController.logout)
router.get('/users/me', auth, UsersController.getMe)

router.post('/users', UsersController.post)
router.post('/users/login', UsersController.login)

router.patch('/users/me', auth, UsersController.patch)

router.delete('/users/me', auth, UsersController.delete)

module.exports = router

// const avatar = multer({
//     limits: {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
//             return cb(new Error('This is not a correct format of the file'))
//         cb(undefined, true)
//     }
// })