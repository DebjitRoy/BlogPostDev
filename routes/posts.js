const express = require("express");
const router = express.Router();

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

router.route("/").get(getPosts).post(createPost);
router.route("/count").get(getPostsCount);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);
router.route("/:id/upload").put(uploadPhotoPost);
router.route("/:id/sectionupload/:sectionid").put(uploadSectionPhoto);

module.exports = router;
