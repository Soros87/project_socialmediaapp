import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middleware/errorMiddleware.js";

//security package
import helmet from "helmet";

const PORT = process.env.PORT || 5100;
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(cors()); //need to have the cors above the app.use()
app.use(morgan("dev"));

//error middleware
app.use(errorMiddleware);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
      console.log("successfully connected to MongoDB Atlas");
    })
  )
  .catch((error) => console.log(`${error} did not connect`));
