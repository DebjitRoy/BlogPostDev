const express = require("express");
const dotenv = require("dotenv");

const postsRoute = require("./routes/posts");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/api/posts", postsRoute);

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`)
);
