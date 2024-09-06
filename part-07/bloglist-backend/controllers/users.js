import bcrypt from "bcrypt";
import express from "express";

import User from "../models/user.js";

const usersRouter = express.Router();

usersRouter.get("/", async (_, res) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "username must be at least 3 characters" });
  }

  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: "password must be at least 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

export default usersRouter;
