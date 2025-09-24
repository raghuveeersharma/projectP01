import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandleing";


const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json());

app.use("/api/auth",userRoutes)

app.use(errorHandler);

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});



export default app;
