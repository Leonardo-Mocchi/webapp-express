const express = require('express');
const app = express();
const cors = require('cors');
const MoviesRouter = require('./routes/MoviesRouter')
const serverError = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')


const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Hello, Movies!');
});

// Movies Router
app.use('/api/v1/movies', MoviesRouter)


// Error Middlewares
app.use(serverError);
app.use(notFound);


// On server start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});