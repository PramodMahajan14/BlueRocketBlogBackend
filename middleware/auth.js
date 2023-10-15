const jwt = require("jsonwebtoken");
const User = require("../models/Usermodel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // let usu = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(token, "USER==>");
    if (!token) return res.status(400).json({ msg: "Invalid 1Authorization" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authorization" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
