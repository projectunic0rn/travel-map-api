"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "city_reviews",
      [
        {
          id: 1,
          reviewPlaceId: 57,
          attraction_type: "logistics",
          attraction_name: "car",
          rating: 0,
          comment: "Hard to drive on the left side",
          cost: 60,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          reviewPlaceId: 57,
          attraction_type: "logistics",
          attraction_name: "bike",
          rating: 2,
          comment: "Great way to get around",
          cost: 0,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          reviewPlaceId: 40,
          attraction_type: "logistics",
          attraction_name: "walk",
          rating: 1,
          comment: "Big city but able to get to most places from our hotel",
          cost: 0,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          reviewPlaceId: 40,
          attraction_type: "logistics",
          attraction_name: "bus",
          rating: 2,
          comment: "Cheap, relatively easy to navigate",
          cost: 4,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          reviewPlaceId: 40,
          attraction_type: "monument",
          attraction_name: "Coliseum",
          rating: 2,
          comment:
            "We did not do a tour, just viewed from the outside. Very impressive still!",
          cost: 0,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          reviewPlaceId: 40,
          attraction_type: "monument",
          attraction_name: "Trevi Fountain",
          rating: 1,
          comment:
            "Beautiful fountain and sculptures but very crowded at all hours, mainly with people trying to get images of themselves.",
          cost: 0,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          reviewPlaceId: 40,
          attraction_type: "monument",
          attraction_name: "St. Peter's Basilica",
          rating: 2,
          comment: "Very impressive, although we did not do the inside tour",
          cost: 0,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          reviewPlaceId: 40,
          attraction_type: "monument",
          attraction_name: "Pantheon",
          rating: 2,
          comment:
            "Impressive to look at, cool temperatures inside were nice on a hot day",
          cost: 0,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          reviewPlaceId: 40,
          attraction_type: "tour",
          attraction_name: "Photography tour",
          rating: 2,
          comment:
            "This is perfect for couples who want good pictures taken for them at the major Roman sites",
          cost: 60,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          reviewPlaceId: 40,
          attraction_type: "lunch",
          attraction_name: "PanDivino Street Food",
          rating: 2,
          comment: "great tapas for a good price",
          cost: 12,
          currency: "EUR",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("city_reviews", null, {});
  }
};
