"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Channel, {
        through: models.Subscription,
        foreignKey: "user_id",
      });

      models.Channel.belongsToMany(models.User, {
        through: models.Subscription,
        foreignKey: "channel_id",
      });
    }
  }
  Subscription.init(
    {
      user_id: DataTypes.INTEGER,
      channel_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Subscription",
    }
  );
  return Subscription;
};
