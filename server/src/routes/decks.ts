import express from "express";
const router = express.Router();
import { getDecks, postDeck } from "../controllers/decks";

router.route("/")
  .get(getDecks)
  .post(postDeck);

export default router;