const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const UsersController = require('../controllers/users.controller');
const router = new express.Router()

router.get('/users/:id/avatar', UsersController.user_get_avatar)
router.get('/users/logout', auth, UsersController.user_logout)
router.get('/users/me', auth, UsersController.user_get_me)

router.post('/users', UsersController.user_create)
router.post('/users/login', UsersController.user_login)
router.post('/users/me/avatar', auth, upload, UsersController.user_edit_my_avatar, (err, req, res, next) => res.status(404).send({ error: err }))

router.patch('/users/me', auth, UsersController.user_update)

router.delete('/users/me', auth, UsersController.user_delete)

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