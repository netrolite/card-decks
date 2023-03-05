import express from "express";
const router = express.Router();
import { getDecks, getDeckById, postDeck, deleteDeck } from "../controllers/decks";

router.route("/")
  .get(getDecks)
  .post(postDeck);

router.route("/:deckId")
  .get(getDeckById)
  .delete(deleteDeck);

export default router;