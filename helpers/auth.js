const auth = (req, res, next) => {
    if (req.session.currentSession) {
        next()
    } else {
        res.redirect(`/login`)
    }
}

module.exports = auth