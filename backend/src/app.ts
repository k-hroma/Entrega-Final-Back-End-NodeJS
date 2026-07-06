import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'
import { authRouter } from './routes/authRouter.js';
import { productsRouter } from './routes/productsRouter.js';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/auth", authRouter);


app.use(notFoundMiddleware);

export { app }
