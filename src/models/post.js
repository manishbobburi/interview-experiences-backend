'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      this.belongsTo(models.Company, {
        foreignKey: "companyId",
        as: 'company',
      })
    }
  }

  Post.init({
    userId: DataTypes.INTEGER,
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: DataTypes.STRING,
    overallDifficulty: DataTypes.INTEGER,
    body: DataTypes.STRING,
    isAnonymous: DataTypes.BOOLEAN,
    upVotes: DataTypes.INTEGER,
    downVotes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};