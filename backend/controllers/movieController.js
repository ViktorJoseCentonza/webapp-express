const connection = require('../data/db')


function index(req, res) {
    const sql = 'SELECT movies.id,movies.title,movies.director,movies.genre,movies.release_year,movies.abstract, movies.image, AVG(vote) as average_rating FROM movies LEFT JOIN reviews ON reviews.movie_id = movies.id GROUP BY movies.id;'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err })
        //console.log(results)
        res.json(results)
        console.log("index route used!")
    })
}

function show(req, res) {
    const id = req.params.id
    const sql = `SELECT movies.id,movies.title,movies.director,movies.genre,movies.release_year,movies.abstract, movies.image, AVG(vote) as average_rating,JSON_ARRAYAGG(JSON_OBJECT('name', reviews.name,'vote', reviews.vote,'text', reviews.text,'created_at', reviews.created_at,'updated_at', reviews.updated_at)) AS reviews FROM movies LEFT JOIN reviews ON reviews.movie_id = movies.id WHERE movies.id = ? GROUP BY movies.id;
`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err })
        //console.log(results)
        if (results.length == 0) {
            return res.json({
                error: "Not Found",
                message: "elemento non trovato"
            });
        }
        console.log("show route used!")
        res.json(results)
    })
}
function storeReview(req, res) {

    const movieIdFromParams = req.params.id;
    const { text, movie_id, name, vote } = req.body;

    // Optional: check consistency between route param and body
    if (parseInt(movieIdFromParams) !== parseInt(movie_id)) {
        return res.status(400).json({ message: "Movie ID mismatch" });
    }

    if (!text || !name || !movie_id) {
        return res.status(400).json({ message: "Missing review data" });
    }

    const sql = `
        INSERT INTO reviews (text, movie_id, name, vote)
        VALUES (?, ?, ?, ?)
    `;

    connection.execute(sql, [text, movie_id, name, vote], (err, result) => {
        if (err) {
            console.error("❌ Failed to insert review:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(201).json({
            message: "Review stored successfully",
            reviewId: result.insertId
        });
    });
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
    storeReview,
    store,
    update,
    modify,
    destroy
}