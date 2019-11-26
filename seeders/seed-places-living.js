"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "places_living",
      [

          {
            UserId: 37,
            "country": "South Africa",
            "countryId": 135426,
            "countryISO": "ZA",
            "city": "Johannesburg",
            "cityId": 34647,
            "city_latitude": -26.1633,
            "city_longitude": 28.0328,
            "year": 2014,
            "days": 2,
            "best_comment": null,
            "hardest_comment": null,
            "trip_purpose": "vacation",
            "trip_company": "friends",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            UserId: 36,
            "country": "New Zealand",
            "countryId": 103016,
            "countryISO": "NZ",
            "city": "Christchurch",
            "cityId": 79990,
            "city_latitude": -43.53,
            "city_longitude": 172.62028,
            "year": 2014,
            "days": 2,
            "best_comment": null,
            "hardest_comment": null,
            "trip_purpose": "vacation",
            "trip_company": "friends",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            UserId: 35,
            "country": "Japan",
            "countryId": 122085,
            "countryISO": "JP",
            "city": "Tokyo",
            "cityId": 1490,
            "city_latitude": 35.68,
            "city_longitude": 139.77,
            "year": 2014,
            "days": 2,
            "best_comment": null,
            "hardest_comment": null,
            "trip_purpose": "vacation",
            "trip_company": "friends",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            UserId: 34,
            "country": "Japan",
            "countryId": 122085,
            "countryISO": "JP",
            "city": "Kyoto",
            "cityId": 34600,
            "city_latitude": 35.01167,
            "city_longitude": 135.76806,
            "year": 2014,
            "days": 2,
            "best_comment": null,
            "hardest_comment": null,
            "trip_purpose": "vacation",
            "trip_company": "friends",
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("places_living", null, {});

  }
};
