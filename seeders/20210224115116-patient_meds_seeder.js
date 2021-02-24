'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seeder = require('../data/patientMedicine.json')
    seeder.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });
    return queryInterface.bulkInsert('PatientMedicines', seeder, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PatientMedicines', null, {});
  }
};
