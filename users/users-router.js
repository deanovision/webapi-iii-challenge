///import express
const express = require("express");
/// setup router
const router = express.Router();
/// import database
const db = require("../data/helpers/userDb");
///setup GET functions
function upperCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}
router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "error getting users"
      });
    });
});
/// setup GET by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  db.getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "this user does not exist"
        });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error getting user"
      });
    });
});
/// setup GET posts by user ID
router.get("/user-posts/:id", (req, res) => {
  const id = Number(req.params.id);
  db.getUserPosts(id)
    .then(userPosts => {
      if (!userPosts) {
        res.status(404).json({
          message: "this user does not exist"
        });
      } else {
        res.status(200).json(userPosts);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error getting user posts"
      });
    });
});
///setup POST functions
router.post("/", upperCase, (req, res) => {
  const userObj = req.body;
  console.log(userObj);
  if (!userObj.name) {
    res.status(400).json({
      message: "Bad Request name required"
    });
  } else {
    db.insert(userObj)
      .then(user => {
        console.log(user);
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: "error adding user" });
      });
  }
});
///setup PUT function
router.put("/:id", upperCase, (req, res) => {
  const id = Number(req.params.id);
  const userObj = req.body;
  if (!userObj.name) {
    res.status(400).json({
      message: "Bad request name is required"
    });
  } else {
    db.update(id, userObj)
      .then(user => {
        if (!user) {
          res.status(404).json({
            message: "user does not exist"
          });
        } else {
          res.status(200).json({
            message: "user updated"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "error updating user"
        });
      });
  }
});
/// setup DELETE function
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  db.remove(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "user does not exist"
        });
      } else {
        res.status(200).json({
          message: "user deleted"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error deleting user"
      });
    });
});
///export router
module.exports = router;
