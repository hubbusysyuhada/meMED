const {Medicine, Patient,PatientMedicine} = require('../models')

class MedicineController {
    static showAll (req, res) {
        Medicine.findAll ()
        
        .then((data) => {
            res.render('medicineView',{data, title: 'Medicine List'})
        })
        .catch ((err) => {
            res.send(err.message)
        })


    }

    static add(req, res) {
        res.render ('addMedicineView', {title: 'Add Medicine'})
    }

    static afterAdd (req, res) {
        let dataNew = {
            name: req.body.name,
            stock: req.body.stock
        }
        Medicine.create(dataNew)
        .then(() => {
            res.redirect('/medicine')
        })
        .catch (err => {
            res.send(err.message)
        })
    }

    static edit(req, res) {
        //let medData
        Medicine.findByPk(req.params.id)

        .then((data) => {
            res.render ('editMedicineView', {data, title: 'Edit Medicine'})
            
        })
        .catch((err) => {
            res.send(err.meesage)
        })
    }

    static afterEdit (req, res) {
        let dataNew = {
            name:req.body.name,
            stock: req.body.stock
        }

        Medicine.update(dataNew, {
            where: {id: req.params.id}
        })

        .then (() => {
            res.redirect('/medicine')
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static delete (req, res) {
        Medicine.destroy ({
            where: {id: Number(req.params.id)}
        })
        .then (() => {
            res.redirect('/medicine')
        })
        .catch(err => {
            res.send(err.message)
        })
    }
}

module.exports = MedicineController
