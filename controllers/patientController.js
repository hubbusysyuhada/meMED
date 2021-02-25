const { Patient, PatientMedicine, Medicine } = require('../models')
const capitalize = require('../helpers/capitalize_word');

class MainController {
    static getPatients (req, res) {
        console.log(req.session);
        Patient.findAll()
        .then(data => {
            res.render('patients', {data})
        })
        .catch ((err) => {
            res.send(err)
        })
    }

    static addPatient (req, res) {
        let query;
        if (req.query.err) {
            query = (req.query.err).split(',')
        }
        console.log(query);
        res.render ('addPatient', {query})
    }

    static storePatient (req, res) {
        let answer = {
            name : capitalize(req.body.name),
            age : req.body.age,
            comorbid : req.body.comorbid,
            gender : req.body.gender
        }
        Patient.create (answer)
        .then (data => {
            res.redirect('/patients')
        })
        .catch (err => {
            let errors = []
            err.errors.forEach(e => {
                errors.push(e.message)
            })

            res.redirect(`/patients/add?err=${errors}`)
        })
    }

    static deletePatient (req, res) {
        Patient.destroy({
            where: {
                id : req.params.id
            }
        })
        .then (() => {
            res.redirect('/patients')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static viewPatient (req, res) {
        let query = req.query.err
        let id = req.params.id
        let numberId = Number(id)
        let details;
        let meds;
        
        PatientMedicine.findAll({
            where: {PatientId : numberId},
            include : Medicine
        })
        .then (data => {
            // res.send(data)
            details = data
            return Medicine.findAll()
        })
        .then(data => {
            meds = data
            // res.render('patientDetails', {data, details})
            return Patient.findByPk(numberId)
        })
        .then(data => {
            // res.send(details)
            if (query) {
                query = query.split(',')
            }
            res.render('patientDetails', {data, details, meds, numberId, query})
        })
        .catch(err => {
            res.send(err)
        })

    }

    static storeMeds (req, res) {
        let id = req.params.id
        PatientMedicine.create({
            MedicineId : Number(req.body.medicineId),
            timesPerDay : req.body.timesPerDay,
            doses : req.body.doses,
            PatientId : Number(id)
        })
        .then(data => {
            res.redirect(`/patients/view/${id}`)
        })
        .catch (err => {
            let errors = []
            err.errors.forEach(e => {
                errors.push(e.message)
            })
            res.redirect(`/patients/view/${id}?err=${errors}`)
        })
    }
}

module.exports = MainController