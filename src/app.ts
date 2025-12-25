import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.use(`${API_PREFIX}/auth`, authRoutes);

export default app;
