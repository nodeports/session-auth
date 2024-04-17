import { Request, Response } from "express";
import User from "../models/user";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.userId = user._id;
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error logging in user" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.status(200).json({ message: "User logged out successfully" });
  });
};
