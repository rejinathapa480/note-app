const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authentication = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;

    const token = authHead.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    console.log(payload)
    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Invalid access token",
      });
    }

    const user = await User.findById(payload.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({
        success: false,
        message: "Invalid access token",
      });
  }
};


module.exports = authentication