const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController")
const authorize = require('../middlewares/authorize')
//index
router.get('/', userController.index)
//authorize on mount
router.get('/auth', authorize, userController.auth)
//show
router.get('/:id', userController.show)
//store
router.post('/', userController.store)
//login
router.post('/login', userController.login)
//update
router.put('/:id', userController.update)
//partial update
router.patch('/:id', userController.modify)
//delete
router.delete('/:id', userController.destroy)

module.exports = router;