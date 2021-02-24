const router = require('express').Router()
const medicineRoute = require('./medicineRoute')
const patientRoute = require('./patientRoute')

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/patient', (req, res) => {
    res.send ("index")
})

module.exports = router