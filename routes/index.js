const router = require('express').Router()
const medicineRoute = require('./medicineRoute')
const patientRoute = require('./patientRoute')

router.get('/', (req, res) => {
    res.render('home')
})
router.use('/patients', patientRoute)

module.exports = router