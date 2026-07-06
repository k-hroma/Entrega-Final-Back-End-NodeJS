import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const validateUser = async (username: string, password: string): Promise<boolean> => {
  return username === "admin" && password === "admin";
};

const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
};

export { validateUser, generateToken };