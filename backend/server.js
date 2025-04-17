const express = require("express");
const app = express()
const port = 3000
const cors = require("cors");
const notFound = require('./middlewares/error404')
const errors = require('./middlewares/errors')
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

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

app.use(express.json());

//middleware
app.use('/movies', moviesRouter)
app.use('/users', usersRouter)

app.use(errors)
app.use(notFound)


