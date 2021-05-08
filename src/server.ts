import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import authController from "./controllers/authController";
import userController from "./controllers/userController";
import { envCheck } from "./utils/envCheck";

// configure dotenv
dotenv.config({ path: "./.env" });

// check for env
envCheck();

// init app
const app = express();
app.use(cors());

// env
const mongoURI: string = process.env[`MONGODB_${process.env.NODE_ENV?.toUpperCase()}_URI`]!;

// init mongoose & start the server
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(`\nConnected to ${process.env.NODE_ENV} database`);
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server started in ${process.env.NODE_ENV} environtment\n`)
    );
  })
  .catch(err => console.log(err));

// add middlewares
app.use(express.json());
app.use(morgan("tiny"));

// controllers
app.use(authController);
app.use(userController);

// test api
app.get("/", (req, res): void => {
  res.status(200).json({ msg: `Server is running in ${process.env.NODE_ENV} environtment` });
});

// 404 api
app.use((req, res) => {
  res.status(404).json({ msg: "Page not found" });
});
