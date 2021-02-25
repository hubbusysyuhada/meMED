'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsToMany(models.Medicine, {through:models.PatientMedicine})
    }

    sayMyName () {
      let result;
      if (this.gender === "male") {
        result = `Mr. ${this.name}`
      } else if (this.gender === "female") {
        result = `Ms. ${this.name}`
      }
      return result
    }

  };
  Patient.init({
    name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Please fill in the name box"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate : {
        errors (value) {
          let fatal = false
          if (value === undefined || value === null || !value) {
            fatal = "Please fill in the age box"
          } else if (value <= 0) {
            fatal = "Please enter a valid age"
          }
          if (fatal) {
            throw new Error (fatal)
          }
        }        
      }
    },
    comorbid: DataTypes.STRING,
    gender : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
    hooks : {
      afterFind (instance) {
        if (instance.comorbid) {
          instance.comorbid = (instance.comorbid).split(',')
        } else {
          instance.comorbid = []
        }
      }
    }
  });
  return Patient;
};