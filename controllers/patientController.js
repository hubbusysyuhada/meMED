const { Patient } = require('../models')
const capitalize = require('../helpers/capitalize_word')

class MainController {
    static getPatients (req, res) {
        Patient.findAll()
        .then(data => {
            data.forEach(el => {
                if (el.gender === "male") {
                    el.name = `Mr. ${el.name}`
                } else if (el.gender === "female") {
                    el.name = `Ms. ${el.name}`
                }
            });
            res.render('patients', {data})
        })
        .catch ((err) => {
            res.send(err)
        })
    }

    static addPatient (req, res) {
        res.render ('addPatient')
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
            res.send(err)
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
}

module.exports = MainController