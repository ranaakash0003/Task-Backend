const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid username or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid username or password.");

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(token);
  } catch (error) {}
});

module.exports = router;
