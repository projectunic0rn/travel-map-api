const User = require("../models").User;
const PlaceVisited = require("../models").Place_visited;
const BlogPost = require("../models").BlogPost;
const { ForbiddenError } = require("apollo-server");
const AuthService = require("../services/auth.service");

let addBlogPosts = async (userId, blogPostData) => {
  try {
    let user = await User.findByPk(userId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to add blog posts to someone elses account"
      );
    }
    let placeRecord = await PlaceVisited.findByPk(
      blogPostData.blogPosts[0].blogPlaceId
    );
    let blogPosts = [];
    // Loop through each review they have provided ... create individual records
    for (let post of blogPostData.blogPosts) {
      if (post.id === 0) {
        let blogPost = placeRecord.createBlogPost({
          id: post.id,
          blogPlaceId: post.blogPlaceId,
          PlaceVisitedId: post.PlaceVisitedId,
          type: post.type,
          name: post.name,
          url: post.url,
          year: post.year
        });
        blogPosts.push(blogPost);
      } else {
        let postToUpdate = await BlogPost.findByPk(post.id);
        console.log(postToUpdate);
        if (AuthService.isNotLoggedIn(user, postToUpdate.UserId)) {
          throw new ForbiddenError(
            "Not Authorized to update a blog post on someone else's account"
          );
        }
        postToUpdate.update(post).then((blogPosts) => blogPosts);
      }
    }
    return await Promise.all(blogPosts);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

let removeBlogPost = async (userId, BlogPostId) => {
  try {
    let user = await User.findByPk(userId);
    let blogPostToDelete = await BlogPost.findByPk(BlogPostId);
    if (AuthService.isNotLoggedIn(user)) {
      throw new ForbiddenError(
        "Not Authorized to remove blog posts from someone elses account"
      );
    }
    return await blogPostToDelete.destroy();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  addBlogPosts,
  removeBlogPost
};
