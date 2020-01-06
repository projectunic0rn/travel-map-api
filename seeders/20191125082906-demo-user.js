"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          username: "user1",
          password: "tester",
          full_name: "user one",
          email: "user1@aol.com",
          gender: "male",
          avatarIndex: 1,
          color: "red",
          georneyScore: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "user2",
          password: "tester",
          full_name: "user two",
          email: "user2@aol.com",
          gender: "male",
          avatarIndex: 2,
          color: "blue",
          georneyScore: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "user3",
          password: "tester",
          full_name: "user three",
          email: "user3@aol.com",
          gender: "female",
          avatarIndex: 4,
          color: "purple",
          georneyScore: 1004,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});

  }
};
