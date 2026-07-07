import type { Request, Response } from 'express';
import { validateUser, generateToken } from '../services/authServices.js'

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const isValid = await validateUser(email, password);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(email);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export { login }