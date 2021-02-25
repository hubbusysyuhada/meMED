const {Medicine, Patient,PatientMedicine} = require('../models')

class MedicineController {
    static showAll (req, res) {
        Medicine.findAll ()
        
        .then((data) => {
            let result = []
            data.forEach(el => {
                if (el.stock < 10) {
                    result.push(el.name)
                }
            });
            result = result.join(', ')
            console.log(result);
            res.render('medicineView',{data, title: 'Medicine List', result})
        })
        .catch ((err) => {
            res.send(err.message)
        })


    }

    static add(req, res) {
        let errors = req.query.errors
        res.render ('addMedicineView', {title: 'Add Medicine', errors})
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
            let errors = []
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            res.redirect(`/medicine/add?errors=${errors}`)
        })
    }

    static edit(req, res) {
        //let medData
        let errors = req.query.errors
        Medicine.findByPk(req.params.id)

        .then((data) => {
            res.render ('editMedicineView', {data, title: 'Edit Medicine', errors})
            
        })
        .catch((err) => {
            res.send(err.meesage)
        })
    }

    static afterEdit (req, res) {
        let id = req.params.id
        
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
            let errors = []
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            res.redirect(`/medicine/edit/${id}?errors=${errors}`)
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
