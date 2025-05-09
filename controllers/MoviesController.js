const connection = require('../database/db')

function index(req, res) {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })

        /* console.log(results); // Debug: Check the results of the SQL query */

        res.json(results)
    })
};

function show(req, res) {

    const { id } = req.params

    const sql = `SELECT 
    movies.id AS movie_id,
    movies.title,
    movies.director,
    movies.genre,
    movies.release_year,
    movies.abstract,
    movies.image AS movie_cover_image,
    reviews.id AS review_id,
	reviews.name AS reviewer_name,
    reviews.text AS review_content,
    reviews.vote AS review_vote
    FROM movies_db.movies
    INNER JOIN reviews
    ON movies.id = reviews.movie_id
    WHERE movies.id = "${id}"`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })

        const movie = {
            id: results[0].movie_id,
            title: results[0].title,
            director: results[0].director,
            genre: results[0].genre,
            release_year: results[0].release_year,
            abstract: results[0].abstract,
            image: results[0].movie_cover_image,
            reviews: results.map(review => ({
                id: review.review_id,
                name: review.reviewer_name,
                text: review.review_content,
                vote: review.review_vote
            }))
        };

        /* console.log(movie); // Debug: Check the results of the SQL query */

        res.json(movie)
    })
};

function createReview(req, res) {
    const { id } = req.params;
    const { name, text, vote } = req.body;

    const sql = `
        INSERT INTO reviews (movie_id, name, text, vote)
        VALUES (?, ?, ?, ?)
    `;

    connection.query(sql, [id, name, text, vote], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: 'Review added successfully!', reviewId: results.insertId });
    });
}

module.exports = {
    index,
    show,
    createReview,
};