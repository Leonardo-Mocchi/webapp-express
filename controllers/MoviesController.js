const connection = require('../database/db')

function index(req, res) {
    res.json({ message: `List of movies` })
};

function show(req, res) {
    const { id } = req.params
    res.json({ message: `Movie with id ${id}` })
};

module.exports = {
    index,
    show
}