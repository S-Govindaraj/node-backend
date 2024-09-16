const jwt = require("jsonwebtoken");
const moment = require("moment");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const axios = require("axios");
const config = require("config");
const User = require("../../Models/User");
const Role = require("../../Models/Role");
const bcrypt = require("bcryptjs");


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user;
    const regExp = new RegExp(`^${username}$`, "i");
    user = await User.findOne({
        username: regExp,
        status: 1,
    }).populate('role',['name'])
    if (!user)
      return res.status(400).json({
        message: "User dose not exist Or Invalid Credentials!",
      });

    const isMatch = await User.compaireMyPassword(
      password,
      String(user?.password)
    );
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    let expiresTime = "2m";
    if (user?.role?.name === "Security") {
      expiresTime = "10y";
    }
    const userInfo = {
      id: user._id,
      username: user.username,
      email:user.email,
      role: user.role
    }
    const payload = {
        user: {
          id: user._id,
          username: user.username,
          email:user.email
        },
      };
    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: expiresTime,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          userInfo
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
