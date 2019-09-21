const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Acces denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    res.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
