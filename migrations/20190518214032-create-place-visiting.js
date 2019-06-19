'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('places_visiting', {
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
      arriving_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      departing_date: {
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
    return queryInterface.dropTable('places_visiting');
  }
};