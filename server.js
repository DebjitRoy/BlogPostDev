const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const multer = require("multer");
// const fileupload = require("express-fileupload");
const path = require("path");

// const profile = require("./routes/test");

const errorHandler = require("./middlewares/error");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectDB();

const postsRoute = require("./routes/posts");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;
const app = express();

// Body Parser
app.use(express.json()); // adds json-parser

// app.use("/api/profile", profile);
// uploading image
// app.use(fileupload());

//setting folder static to be accessible from browser
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", postsRoute);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`)
);
