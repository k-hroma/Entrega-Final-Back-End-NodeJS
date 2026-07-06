import type { Request, Response } from 'express';
import { validateUser } from '../services/authServices.js'

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const isValid = await validateUser(username, password);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    return res.status(200).json({ message: "Login OK (token pendiente)" });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

export { login }