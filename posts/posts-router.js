///import express
const express = require("express");
/// setup router
const router = express.Router();
/// import database
const db = require("../data/helpers/postDb");
///setup GET functions
router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "error getting posts"
      });
    });
});
/// setup GET by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  db.getById(id)
    .then(posts => {
      if (!posts) {
        res.status(404).json({
          message: "this post does not exist"
        });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error getting posts"
      });
    });
});
///setup POST functions
router.post("/", (req, res) => {
  const postObj = req.body;
  console.log(postObj);
  if (!postObj.text || !postObj.user_id) {
    res.status(400).json({
      message: "Bad Request text and user_id required"
    });
  } else {
    db.insert(postObj)
      .then(post => {
        console.log(post);
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: "error adding post" });
      });
  }
});
///setup PUT function
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const postObj = req.body;
  if (!postObj.text || !postObj.user_id) {
    res.status(400).json({
      message: "Bad request text and user_id required"
    });
  } else {
    db.update(id, postObj)
      .then(post => {
        if (!post) {
          res.status(404).json({
            message: "post does not exist"
          });
        } else {
          res.status(200).json({
            message: "post updated"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "error updating post"
        });
      });
  }
});
/// setup DELETE function
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  db.remove(id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "post does not exist"
        });
      } else {
        res.status(200).json({
          message: "post deleted"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "error deleting post"
      });
    });
});
///export router
module.exports = router;
