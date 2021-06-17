const express = require("express");
const router = express.Router();
var multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const Professor = require("../models/professor");
const Video = require("../models/video");
const path = require("path");
ffmpeg.setFfprobePath("c:\\ffmpeg\\bin\\ffprobe.exe");
const { Subscriber } = require("../models/subscriber");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 video is allowed "), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

const getVideoInfo = (inputPath) => {
  return new Promise((resolve, reject) => {
    return ffmpeg.ffprobe(inputPath, (error, videoInfo) => {
      if (error) {
        return reject(error);
      }

      const { duration, size } = videoInfo.format;

      return resolve({
        size,
        durationInSeconds: Math.floor(duration),
      });
    });
  });
};

///////////

//////////
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ success: "false", err });
    }
    const videoPath = path.join(__dirname, "../", res.req.file.path);
    getVideoInfo(videoPath)
      .then((fileData) => {
        ffmpeg(videoPath)
          .on("filenames", function (filenames) {
            console.log("Will generate " + filenames.join(", "));
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
          })
          .on("end", function () {
            console.log("Screenshots taken");

            return res.status(200).send({
              success: true,
              filePath: res.req.file.path,
              duration: fileData.durationInSeconds,
              fileName: res.req.file.filename,

              thumbsFilePath: thumbsFilePath,
            });
          })
          .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: "uploads/thumbnails",
            size: "320x240",
            // %b input basename ( filename w/o extension )
            filename: "thumbnail-%b.png",
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(err);
      });
  });
});

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";
});

router.get("/video-info", (req, res) => {
  getVideoInfo(
    "C:/Users/Hache/OneDrive/Bureau/GMC/projet/uploads/1617972564284_2021-03-11 14-50-26.mp4"
  ).then((data) => {
    console.log(data);
    res.send(data);
  });
});

router.post("/UploadCourse", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).send({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("professor")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).send({ success: true, videos });
    });
});

router.post("/getVideo", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("professor")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).send({ success: true, video });
    });
});

router.post("/favourieCourses", (req, res) => {
  //Need to find all of the Users that I am subscribing to From Subscriber Collection
  console.log(req.body.userFrom);
  Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscribers) => {
    if (err) return res.status(400).send(err);

    let subscribedUser = [];

    subscribers.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    });

    //Need to Fetch all of the Videos that belong to the Users that I found in previous step.
    Video.find({ professor: { $in: subscribedUser } })
      .populate("professor")
      .exec((err, videos) => {
        if (err) return res.status(400).send(err);
        res.status(200).send({ success: true, videos });
      });
  });
});

router.get("/:id", (req, res) => {
  Video.findById(req.params.id)
    .then((video) => res.status(200).send(video))
    .catch((err) => res.status(400).send(`error: ${err}`));
});

router.put("/update/:id", (req, res) => {
  Video.findById(req.params.id)
    .then((video) => {
      video.title = req.body.title;
      video.description = req.body.description;
      video
        .save()
        .then(() => res.status(200).send("the article is updated successfuly"))
        .catch((err) => res.status(400).send(`error: ${err}`));
    })
    .catch((err) => res.status(200).send(`errot: ${err}`));
});

router.delete("/coursesList/:_id", async (req, res) => {
  const id = req.params.id;
  try {
    const courseToDelete = await Video.findOneAndRemove(id);
    if (!courseToDelete) {
      res.status(200).send({ msg: "Cours already deleted ..." });
      return;
    }
    res.status(200).send({ msg: "Cours deleted ...", courseToDelete });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Can not delete cours with this id !!", error });
    console.log(error);
  }
});

module.exports = router;
