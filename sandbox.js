const { Patient, PatientMedicine, Medicine } = require('./models')


const data = () => {
    PatientMedicine.findAll({include : Medicine})
    .then(result => {
        let medname = []
        let ammount = []
        let quantity = {}
        for (let i = 0; i < result.length; i++) {
            let name = result[i].Medicine.name
            if (!quantity[name]) {
                quantity[name] = result[i].doses
            } else {
                quantity[name] += result[i].doses
            }
        }
        for (let key in quantity) {
            medname.push(key);
            ammount.push(quantity[key]);
        }
        console.log();
        return{medname, ammount}
        // res.render('patients', {data, ammount, medname})
    })
    .catch ((err) => {
        // res.send(err)
    })
}

module.exports = data
