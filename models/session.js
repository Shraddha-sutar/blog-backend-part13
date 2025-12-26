'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Session extends Model {}

  Session.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      token: { type: DataTypes.STRING, allowNull: false },
      expires_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'session',
      underscored: true,
      timestamps: true
    }
  );

  Session.associate = (models) => {
    Session.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Session;
};
