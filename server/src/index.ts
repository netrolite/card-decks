import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import connectDB from "./utils/connectDB";
import decksRoute from "./routes/decks";
const app = express();


app.use(express.json());


app.use("/decks", decksRoute);

const PORT = process.env.PORT ?? 4000;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, () => {
      console.log(`DB connected. Server listening on port ${PORT}`);
    })
  } catch (err) {
    console.error(err);
  }
})();
