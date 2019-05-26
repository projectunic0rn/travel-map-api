'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('friend_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      receiverId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
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
        'ALTER TABLE `friendRequests` ADD UNIQUE `senderId_receiverId`(`senderId`, `receiverId`)'
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('friend_requests');
  }
};