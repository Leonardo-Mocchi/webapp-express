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

    const sql = `SELECT * FROM movies_db.movies WHERE id = "${id}"`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })

        /* console.log(results); // Debug: Check the results of the SQL query */

        res.json(results)
    })
};

module.exports = {
    index,
    show
}