const express = require("express");
const router = express.Router();

const { Subscriber } = require("../models/subscriber");

//=================================
//             Subscribe
//=================================

router.post("/subscribeNumber", (req, res) => {
  console.log(req.body);
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    console.log(subscribe);
    res.status(200).send({ success: true, subscribeNumber: subscribe.length });
  });
});

router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.status(200).send({ success: true, subcribed: result });
  });
});

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);
  console.log(req.body);
  subscribe.save((err, doc) => {
    if (err) return res.send({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.post("/unSubscribe", (req, res) => {
  console.log(req.body);

  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send({ success: false, err });
    res.status(200).send({ success: true, doc });
  });
});

module.exports = router;

{
  /*
router.post("/subscribed", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(subscribe.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, subcribed: result  })
    })

});*/
}
