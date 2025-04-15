const serverError = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something Broke!' })
}

module.exports = serverError