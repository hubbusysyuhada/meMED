const router = require('express').Router()
const medicineRoute = require('./medicineRoute')
const patientRoute = require('./patientRoute')
const sessionController = require('../controllers/sessionController')
const auth = require('../helpers/auth')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/register', sessionController.register)
router.post('/register', sessionController.newAccount)
router.get('/login', sessionController.login)
router.post('/login', sessionController.checkAccount)
router.get('/logout', sessionController.logout)
router.use(auth)
router.use('/patients', patientRoute)

router.use('/medicine', medicineRoute)


module.exports = router