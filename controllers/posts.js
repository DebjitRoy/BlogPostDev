// GET All
module.exports.getPosts = (req, res) => {
  res.status(200).json({ success: true, msg: "show all posts" });
};

// GET Single
module.exports.getPost = (req, res) => {
  res.status(200).json({ success: true, msg: `show post ${req.params.id}` });
};

// CREATE/POST
module.exports.createPost = (req, res) => {
  res.status(200).json({ success: true, msg: "create new posts" });
};

// Update/PUT
module.exports.updatePost = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `updating post ${req.params.id}` });
};

// DELETE
module.exports.deletePost = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `deleting post ${req.params.id}` });
};
