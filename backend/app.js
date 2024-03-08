require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const customMiddleware = require("./middleware/customMiddleware");
const userRouter = require("./routers/userRouter");
const fitnessRouter = require("./routers/fitnessRouter");

// express app
const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use(customMiddleware.requestLogger);

app.get("/", (req, res) => res.send("API Running!"));

app.use("/api/users", userRouter);
app.use("/api/fitness", fitnessRouter);

app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

module.exports = app;
