"use strict";
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost",
    {
      blogPlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    },
    {
      tableName: "blog_posts",
      name: {
        singular: "BlogPost",
        plural: "BlogPosts"
      }
    }
  );
  BlogPost.associate = function(models) {
    BlogPost.belongsTo(models.Place_visited);
  };
  return BlogPost;
};
