/// import express
const express = require("express");
/// setup server using express()
const server = express();
///setup server to parse json
server.use(express.json());
///import routes
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");
/// setup / endpoint
server.get("/", (req, res) => {
  res.status(200).send("<p>API Online Navigate to Desired Endpoint</p>");
});
/// assign routes to server
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

///export server
module.exports = server;
