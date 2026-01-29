'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt");

const { ServerConfig } = require("../config");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user) {
    const encryptedPssword = bcrypt.hashSync(user.passwordHash, +ServerConfig.SALT_ROUNDS);
    user.passwordHash = encryptedPssword;
  })
  return User;
};