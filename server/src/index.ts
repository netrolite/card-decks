import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express, { Request, Response } from "express";
import connectDB from "./utils/connectDB";
import cardsRoute from "./routes/cards";
const app = express();

app.use(express.json());

app.use("/cards", cardsRoute);

const PORT = 4000;
(async () => {
  try {
    connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, () => {
      console.log(`DB connected. Server listening on port ${PORT}`);
    })
  } catch (err) {
    console.error(err);
  }
})();