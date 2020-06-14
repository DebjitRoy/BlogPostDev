const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

connectDB();

const postsRoute = require("./routes/posts");

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;
const app = express();

// Body Parser
app.use(express.json()); // adds json-parser

app.use("/api/posts", postsRoute);

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} on ${PORT}`)
);
