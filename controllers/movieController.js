const connection = require('../data/db')


function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        res.json(results)
    })
}

function show(req, res) {
    const id = req.params.id
    const sql = `SELECT * FROM movies_db.movies WHERE movies.id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        console.log(results)
        if (results.length == 0) return res.status(404)
        res.json({
            error: "Not Found",
            message: "Pagina non trovata"
        });
        res.json(results)
    })
}

function store(req, res) {
}

function update(req, res) {
}

function modify(req, res) {
}

function destroy(req, res) {
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}