const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UsersController')

const upload  = require('../middleware/upload')


router.get('/', UserController.index)
router.post('/show:id', UserController.show)
router.post('/store', upload.single('avatar'),UserController.store)
router.post('/update:id', UserController.update)
router.post('/delete:id', UserController.destroy)

module.exports = router


