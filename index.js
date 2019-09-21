const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const actors = require("./routes/actors");
const users = require("./routes/users");
const login = require("./routes/login");
const movies = require("./routes/movies");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/task", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error(`Cound not connect to MongoDB...`));

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/api/actors", actors);
app.use("/api/user/signup", users);
app.use("/api/user/login", login);
app.use("/api/movies", movies);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
