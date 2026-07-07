import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const validateUser = async (email: string, password: string): Promise<boolean> => {
  return email === "admin@gmail.com" && password === "123456";
};

const generateToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
};

export { validateUser, generateToken };