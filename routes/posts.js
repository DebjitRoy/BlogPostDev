const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "show all posts" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ success: true, msg: `show post ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "create new posts" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `updating post ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `deleting post ${req.params.id}` });
});

module.exports = router;
