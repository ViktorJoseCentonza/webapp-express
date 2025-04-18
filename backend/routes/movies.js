const express = require('express')
const router = express.Router();
const moviesController = require("../controllers/movieController")

//index
router.get('/', moviesController.index)
//show
router.get('/:id', moviesController.show)
//store
router.post('/review/:id', moviesController.storeReview)
//store
router.post('/:id', moviesController.store)
//update
router.put('/:id', moviesController.update)
//partial update
router.patch('/:id', moviesController.modify)
//delete
router.delete('/:id', moviesController.destroy)

module.exports = router;