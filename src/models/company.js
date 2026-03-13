'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: "companyId",
        as: "posts",
      });
    }
  }
  Company.init({
    name: DataTypes.STRING,
    logoPath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};