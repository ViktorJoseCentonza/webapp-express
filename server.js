const express = require("express");
const app = express()
const port = 3000

const moviesRouter = require('./routes/movies');


app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})
//main
app.get('/', (req, res) => {
    res.send(`welcome to my server!`)
})

//middleware
app.use('/movies', moviesRouter)


