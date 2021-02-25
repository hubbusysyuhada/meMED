let data;
console.log(req.session);
Patient.findAll()
.then(result => {
    data = result
    return PatientMedicine.findAll({include : Medicine})
})
.then(result => {
    let quantity = {}
    for (let i = 0; i < result.length; i++) {
        let name = result[i].Medicine.name
        if (!quantity[name]) {
            quantity[name] = result[i].doses
        } else {
        quantity[name] += result[i].doses
        }
    }
    let medname = []
    let ammount = []
    for (let key in quantity) {
        medname.push(key);
        ammount.push(quantity[key]);
    }
    res.render('patients', {data, ammount, medname})
})
.catch ((err) => {
    res.send(err)
})