const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
  
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });
  
    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({
          success: false,
          message: "User already exist with same email",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
    }
  
    const user = await User.create({ email, username, password });
  
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Unable to sign up.Try again",
      });
    }
  
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.ACCESS_SECRET
    );
    res.status(201).json({
      success: true,
      message: "Successfully registered",
      data: {
        accessToken,
        userData: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        message: "Sign up failed. Try again"
    })
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    const isPassCorrect = await user.doesPassMatch(password);
  
    if (!isPassCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
  
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.ACCESS_SECRET
    );
  
    res.status(200).json({
      success: true,
      message: "Sucessfully login",
      data: {
        accessToken,
        userData: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Login failed. Try again"
    })
  }
};

module.exports = { login, signUp };
