import { Router } from 'express';

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

productsRouter.get("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

productsRouter.post("/create", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

productsRouter.delete("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

export { productsRouter }

