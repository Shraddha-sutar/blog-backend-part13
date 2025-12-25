const { DataTypes } = require('sequelize')

'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
    });

    await queryInterface.createTable('blogs', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      author: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      year: { type: DataTypes.INTEGER },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date() },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('users');
  }
};
