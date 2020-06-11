"use strict";
module.exports = (sequelize, DataTypes) => {
  const CityReview = sequelize.define(
    "CityReview",
    {
      reviewPlaceId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      review_longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      review_latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      attraction_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      attraction_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "city_reviews",
      name: {
        singular: "CityReview",
        plural: "CityReviews"
      }
    }
  );
  CityReview.associate = function(models) {
    CityReview.belongsTo(models.Place_visited);
    CityReview.belongsTo(models.Place_visiting);
    CityReview.belongsTo(models.Place_living);
  };
  return CityReview;
};
