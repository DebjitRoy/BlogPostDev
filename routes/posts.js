const express = require("express");
const router = express.Router();

const commentsRouter = require("./comments");

const {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  uploadPhotoPost,
  uploadSectionPhoto,
  getPostsCount,
} = require("../controllers/posts");

// Re-route into other router
router.use("/:postId/comments", commentsRouter);

router.route("/").get(getPosts).post(createPost);
router.route("/count").get(getPostsCount);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
router.route("/:id/upload").put(uploadPhotoPost);
router.route("/:id/sectionupload/:sectionid").put(uploadSectionPhoto);

module.exports = router;
