const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicineController');


router.get('', MedicineController.showAll)

router.get('/add', MedicineController.add)
router.post('/add', MedicineController.afterAdd)

router.get('/edit/:id', MedicineController.edit)
router.post('/edit/:id', MedicineController.afterEdit)

router.get('/delete/:id', MedicineController.delete)

module.exports = router


