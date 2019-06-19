'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('places_visited', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      country: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      city: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date_arrived: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_departed: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('places_visited');
  }
};