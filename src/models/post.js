'use strict';
const {
  Model,
  Sequelize
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

      this.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments",
        onDelete: "CASCADE",
      });

      this.hasMany(models.Vote, {
        foreignKey: "postId",
        as: "votes",
        onDelete: "CASCADE",
      });
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
    downVotes: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};