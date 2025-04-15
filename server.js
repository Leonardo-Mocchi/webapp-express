const express = require('express');
const app = express();
const cors = require('cors');
const MoviesRouter = require('./routes/MoviesRouter')

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Hello, Movies!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.use('/api/v1/movies', MoviesRouter)


// Error Middlewares
app.use((req, res, next, err) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something Broke!' })
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Sorry, that route doesn\'t exist!' })
});
