"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("city_reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PlaceVisitedId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      PlaceVisitingId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      PlaceLivingId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      attraction_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attraction_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      currency: {
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
    return queryInterface.dropTable("city_reviews");
  }
};
