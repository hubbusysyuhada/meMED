'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientMedicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientMedicine.belongsTo(models.Patient)
      PatientMedicine.belongsTo(models.Medicine)
    }
  };
  PatientMedicine.init({
    PatientId: DataTypes.INTEGER,
    MedicineId: DataTypes.INTEGER,
    timesPerDay: DataTypes.INTEGER,
    doses: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientMedicine',
  });
  return PatientMedicine;
};