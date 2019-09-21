const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).send("An user with same Username is exist");
    user = new User({
      username: req.body.username,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(token);
  } catch (error) {}
});

module.exports = router;
