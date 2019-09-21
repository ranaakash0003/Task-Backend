const express = require("express");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const movies = await Movie.find()
    .populate("actors", "-_id")
    .select("-_id");
  res.send(movies);
});

router.post("/", auth, async (req, res) => {
  try {
    let movie = new Movie({
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
      actors: req.body.actors
    });
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
