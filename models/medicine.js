'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.belongsToMany(models.Patient, {through:models.PatientMedicine})
    }
  };
  Medicine.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg: `Medicine name can't be empty`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
      quantity (input) {
        let alert = false
        if (input < 0) {
          alert = "Please enter proper stock"
        } 
        if (alert) {
          throw new Error (alert);
        }
      }
    }
  }
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};