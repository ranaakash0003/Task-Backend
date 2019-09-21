const express = require("express");
const { Actor } = require("../models/actor");
const router = express.Router();

router.get("/", async (req, res) => {
  const actors = await Actor.find()
    .sort("name")
    .select("-_id");
  res.send(actors);
});

router.post("/", async (req, res) => {
  try {
    let actor = new Actor({
      name: req.body.name,
      birthday: req.body.birthday,
      country: req.body.country
    });
    await actor.save();
    res.send(actor);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
