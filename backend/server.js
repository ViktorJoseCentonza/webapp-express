const express = require("express");
const app = express()
const port = 3000
const cors = require("cors");
const notFound = require('./middlewares/error404')
const errors = require('./middlewares/errors')
const moviesRouter = require('./routes/movies');

app.use(express.static('./public'))

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})
//main
app.get('/', (req, res) => {
    res.send(`welcome to my server!`)
})


//middleware
app.use('/movies', moviesRouter)

app.use(errors)
app.use(notFound)


