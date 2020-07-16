const path = require("path");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const url = require("url");
const Post = require("../models/Post");
const Section = require("../models/Section");
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

// Get Count Data
module.exports.getPostsCount = async (req, res) => {
  try {
    let query = Post.find();
    const posts = await query;
    const travelPost = await Post.find({ postType: "travel" });
    const booksPost = await Post.find({ postType: "books" });
    const misclPost = await Post.find({ postType: "miscl" });
    res.status(200).json({
      success: true,
      count: posts.length,
      travelcount: travelPost.length,
      bookcount: booksPost.length,
      misclcount: misclPost.length,
    });
  } catch (err) {
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
    // console.log(req.body);
    const post = await Post.create(req.body);
    // console.log(post);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, err: error });
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
    next(new ErrorResponse(`Post ID ${req.params.id} not found`, 404));
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
    console.log(error);
    next(new ErrorResponse(`Post ID ${req.params.id} not found`, 404));
  }
};

// Upload Photo

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.S3_BUCKET_NAME,
});

/**
 * Single Upload
 */
// `photo_${post._id}${path.parse(file.name).ext}`
const imgUpload = (post, sectionid) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      acl: "public-read",
      key: function (req, file, cb) {
        // console.log("INSIDE MULTER: " + JSON.stringify(file));
        if (sectionid) {
          cb(
            null,
            `photo_${post._id}-${sectionid}${path.extname(file.originalname)}`
          );
        } else {
          cb(null, `photo_${post._id}${path.extname(file.originalname)}`);
        }
      },
    }),
    limits: { fileSize: process.env.MAX_FILE_UPLOAD }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("file");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

//image url
//https://bengali-blog-static-uploads.s3.amazonaws.com/photo-name
module.exports.uploadPhotoPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404)
    );
  }
  imgUpload(post)(req, res, (error) => {
    // console.log("requestOkokok", req.file);
    // console.log("error", error);
    if (error) {
      console.log("errors", error);
      // res.json({ error: error });
      return next(new ErrorResponse(`${error.message}`, 400));
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        // res.json("Error: No File Selected");
        return next(new ErrorResponse(`Please upload file`, 400));
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        Post.findByIdAndUpdate(post._id, { photoHero: imageName }).then(() => {
          res.json({
            image: imageName,
            location: imageLocation,
          });
        });
        // Save the file name into database into profile model
      }
    }
  });
  // console.log("UPLD:" + upld);
  // await Post.findByIdAndUpdate(req.params.id, { photoHero: imageLocation });
};

// Section Upload
module.exports.uploadSectionPhoto = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404)
    );
  }
  imgUpload(post, req.params.sectionid)(req, res, (error) => {
    // console.log("requestOkokok", req.file);
    // console.log("error", error);
    if (error) {
      console.log("errors", error);
      // res.json({ error: error });
      return next(new ErrorResponse(`${error.message}`, 400));
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        // res.json("Error: No File Selected");
        return next(new ErrorResponse(`Please upload file`, 400));
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        const updatedContent = [];
        post.content.forEach((section) => {
          // console.log(section, req.params.sectionid);
          if (section._id.toString() === req.params.sectionid) {
            section.image = imageName;
          }
          updatedContent.push(section);
        });
        // console.log(updatedContent);
        Post.findByIdAndUpdate(post._id, { content: updatedContent }).then(
          () => {
            res.json({
              image: imageName,
              location: imageLocation,
            });
          }
        );
        // Section.findByIdAndUpdate(req.params.sectionid, {
        //   image: imageName,
        // }).then(() => {
        //   res.json({
        //     image: imageName,
        //     location: imageLocation,
        //   });
        // });
        // Save the file name into database into profile model
      }
    }
  });
  // console.log("UPLD:" + upld);
  // await Post.findByIdAndUpdate(req.params.id, { photoHero: imageLocation });
};

// File Upload to local store
// module.exports.uploadPhotoPost = async (req, res, next) => {
//   const post = await Post.findById(req.params.id);
//   if (!post) {
//     return next(
//       new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404)
//     );
//   }
//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload file`, 400));
//   }
//   const file = req.files.file;

//   if (!file.mimetype.startsWith("image/")) {
//     return next(new ErrorResponse(`Please upload an image`, 400));
//   }

//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `File size bigger than ${process.env.MAX_FILE_UPLOAD}`,
//         400
//       )
//     );
//   }

//   // create filename
//   file.name = `photo_${post._id}${path.parse(file.name).ext}`;

//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
//     if (err) {
//       return next(new ErrorResponse(`Error upload an image`, 500));
//     }
//     await Post.findByIdAndUpdate(req.params.id, { photoHero: file.name });

//     res.status(200).json({
//       success: true,
//       data: file.name,
//     });
//   });
// };
