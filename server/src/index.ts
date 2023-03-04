import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import corsConfig from "./config/cors";
import express from "express";
import connectDB from "./utils/connectDB";
import decksRoute from "./routes/decks";
import errHandler from "./utils/errHandler";
const app = express();


app.use(cors(corsConfig));
app.use(express.json());

app.use("/decks", decksRoute);

app.use(errHandler);

const PORT = process.env.PORT ?? 4000;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () => {
      console.log(`DB connected. Server listening on port ${PORT}`);
    })
  } catch (err) {
    console.error(err);
  }
})();
