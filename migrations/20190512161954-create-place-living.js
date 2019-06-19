'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('places_living', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        unique: true
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
      living_time: {
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
    return queryInterface.dropTable('places_living');
  }
};