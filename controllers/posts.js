const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

// GET All
module.exports.getPosts = async (req, res) => {
  try {
    // Handle input queries
    // let queryStr = JSON.stringify(req.query);
    const requestQuery = { ...req.query };
    const omitFields = ["select", "sort", "limit", "page"];

    omitFields.forEach((field) => {
      if (requestQuery[field]) {
        delete requestQuery[field];
      }
    });
    let queryStr = JSON.stringify(requestQuery);

    // handle mongoose $gt, $gte, $lt, $lte, $in
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    let query = Post.find(JSON.parse(queryStr));

    //Select
    if (req.query.select) {
      const flds = req.query.select.split(",").join(" ");
      query = query.select(flds);
    }
    //Sort
    if (req.query.sort) {
      const flds = req.query.sort.split(",").join(" ");
      query = query.sort(flds);
    } else {
      query = query.sort("-createdAt");
    }

    //Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; // per page
    const startIdx = (page - 1) * limit;
    const endIndex = page * limit;
    // const total = await Post.countDocuments();
    const data = await query;
    const total = data.length;
    const totalPage = Math.round(total / limit);

    query = query.skip(startIdx).limit(limit);
    // pagination result
    const pagination = { totalPage };
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIdx > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    const posts = await query;
    res
      .status(200)
      .json({ success: true, data: posts, count: posts.length, pagination });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// GET Single
module.exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    next(new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404));
  }
};

// CREATE/POST
module.exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// Update/PUT
module.exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    next(new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404));
  }
};

// DELETE
module.exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    next(new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404));
  }
};
