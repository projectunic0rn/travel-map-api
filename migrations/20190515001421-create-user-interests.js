'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_interests', {
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
      InterestId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function () {
      return queryInterface.sequelize.query(
        'ALTER TABLE `user_interests` ADD UNIQUE `user_interest`(`UserId`, `InterestId`)'
      );
    });;
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_interests');
  }
};