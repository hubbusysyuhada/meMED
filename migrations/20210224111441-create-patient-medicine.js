'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PatientMedicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references : {
          model : "Patients",
          key : "id"
        }
      },
      MedicineId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references : {
          model : "Medicines",
          key : "id" ,
        }
      },
      timesPerDay: {
        type: Sequelize.INTEGER
      },
      doses: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PatientMedicines');
  }
};