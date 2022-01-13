var express = require("express");
const res = require("express/lib/response");
const { createAudio, getAudio, getSound } = require("../controllers/audio");
var router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hey postman, this is home route",
  });
});

router.post("/", createAudio);
router.get("/audio/:audioId", getAudio);
router.get("/audio/sound/:audioId", getSound);

module.exports = router;
