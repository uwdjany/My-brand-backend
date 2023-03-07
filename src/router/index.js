import express from "express";
import UserRoutes from "./userRoutes";
const app = express()
app.use("/user", UserRoutes)

export default app;