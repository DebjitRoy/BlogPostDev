const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getComments,
  getComment,
  addComment,
  deleteComment,
  updateComment,

  // getPosts,
  // createPost,
  // updatePost,
  // deletePost,
  // uploadPhotoPost,
  // uploadSectionPhoto,
  // getPostsCount,
} = require("../controllers/comments");

router.route("/").get(getComments).post(addComment);
router.route("/:id").get(getComment).put(updateComment).delete(deleteComment);

module.exports = router;
