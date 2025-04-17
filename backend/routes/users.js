const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController")

//index
router.get('/', userController.index)
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