import { Router } from 'express';

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  res.status(501).json({ message: "Notimplemented yet" });
});

export { authRouter };