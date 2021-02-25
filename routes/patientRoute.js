const router = require('express').Router()
const MainController = require('../controllers/patientController')

router.get('/', MainController.getPatients)
router.get('/add', MainController.addPatient)
router.post('/add', MainController.storePatient)
router.get('/delete/:id', MainController.deletePatient)
router.get('/view/:id', MainController.viewPatient)
router.post('/view/:id', MainController.storeMeds)

module.exports = router