import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import config from "../utils/config.js";

import User from "../models/user.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const loginCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !loginCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: "1d" });

  res.status(200).send({
    token,
    id: user._id,
    username: user.username,
    name: user.name,
  });
});

export default loginRouter;
