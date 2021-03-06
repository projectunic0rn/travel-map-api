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
        type: Sequelize.STRING,
        allowNull: false
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      countryISO: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      city_longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      city_latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
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
      year: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      days: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      best_comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hardest_comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      trip_purpose: {
        type: Sequelize.STRING,
        allowNull: true
      },
      trip_company: {
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
