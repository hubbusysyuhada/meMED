'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seeder = require('../data/patients.json')
    seeder.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });
    return queryInterface.bulkInsert('Patients', seeder, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Patients', null, {});
  }
};
