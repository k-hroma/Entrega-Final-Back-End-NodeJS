import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'
import { authRouter } from './routes/authRouter.js';
import { productsRouter } from './routes/productsRouter.js';

const app: Application = express();

app.use(cors({

    origin: ["*"],

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"]

}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.use("/auth", authRouter);
app.use("/api/products", productsRouter);


app.use(notFoundMiddleware);

export { app }
