const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)

let myPlaintextPassword = "password"
const hash = bcrypt.hashSync(myPlaintextPassword, salt)
console.log(hash);

console.log(bcrypt.compareSync(myPlaintextPassword, "$2b$10$4qql5Jx3G2KIq34E0.hgLe6qhhdRkXAR14udX9q3SDUNy4hSJ/t12"));