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
router.get('/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM movies_db.movies WHERE movies.id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        if (results.length == 0) return res.status(404).json({ error: '404 not found' })
        res.json(results)
    })
})
//store
router.post('/:id', (req, res) => {

})
//update
router.put('/:id', (req, res) => {

})
//partial update
router.patch('/:id', (req, res) => {

})
//delete
router.delete('/:id', (req, res) => {

})

module.exports = router;