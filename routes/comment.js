const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comment");

//=================================
//             Subscribe
//=================================

router.post("/saveComment/professor", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.send({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("professor")
      .exec((err, result) => {
        if (err) return res.send({ success: false, err });
        return res.status(200).send({ success: true, result });
      });
  });
});

router.post("/saveComment/student", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.send({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("student")
      .exec((err, result) => {
        if (err) return res.send({ success: false, err });
        return res.status(200).send({ success: true, result });
      });
  });
});

router.post("/getComments/student", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("student")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).send({ success: true, comments });
    });
});

router.post("/getComments/professor", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("professor")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).send({ success: true, comments });
    });
});

module.exports = router;
