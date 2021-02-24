'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seeder = require('../data/medicines.json')
    seeder.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    });
    return queryInterface.bulkInsert('Medicines', seeder, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Medicines', null, {});
  }
};
