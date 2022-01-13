const fs = require("fs");
const Audio = require("../models/audio");
const formidable = require("formidable");

exports.createAudio = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    console.log(fields);

    const { name } = fields;

    let audio = new Audio(fields);

    // handle file here
    if (file.sound) {
      console.log(file.sound.filepath);
      console.log(file.sound.mimetype);
      audio.sound.data = fs.readFileSync(file.sound.filepath);
      audio.sound.contentType = file.sound.mimetype;
    }
    // save to the DB
    audio.save((err, audio) => {
      if (err) {
        return res.status(400).json({
          error: "Error saving product to DB",
        });
      }
      res.json(audio);
    });
  });
};

exports.getAudio = (req, res) => {
  console.log(req.params);
  const id = req.params.audioId;
  Audio.findById(id).exec((err, audio) => {
    if (err) {
      return res.status(400).json({
        error: "Audio not found",
      });
    }
    audio.sound = undefined;
    console.log(audio);
    return res.json(audio);
  });
};

exports.getSound = (req, res) => {
  const id = req.params.audioId;
  Audio.findById(id, (err, audio) => {
    if (err) {
      return res.status(400).json({
        error: "Audio not found",
      });
    }
    res.set("Content-Type", audio.sound.contentType);
    return res.send(audio.sound.data);
  });
};
