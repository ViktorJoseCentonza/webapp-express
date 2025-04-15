const express = require('express')
const router = express.Router();
const connection = require('../data/db')

//index
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        res.json(results)
    })
})
//show
router.get('/:slug', (req, res) => {
})
//store
router.post('/:slug', (req, res) => {

})
//update
router.put('/:slug', (req, res) => {

})
//partial update
router.patch('/:slug', (req, res) => {

})
//delete
router.delete('/:slug', (req, res) => {

})

module.exports = router;