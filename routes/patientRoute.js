const router = require('express').Router()
const MainController = require('../controllers/patientController')

router.get('/', MainController.getPatients)
router.get('/add', MainController.addPatient)
router.post('/add', MainController.storePatient)
router.get('/delete/:id', MainController.deletePatient)

module.exports = router