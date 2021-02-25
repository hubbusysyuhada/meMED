'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn ("Patients", "gender", Sequelize.STRING, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn ("Patients", "gender", {})
  }
};
