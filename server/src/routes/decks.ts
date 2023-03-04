import express from "express";
const router = express.Router();
import { getDecks, postDeck, deleteDeck } from "../controllers/decks";

router.route("/")
  .get(getDecks)
  .post(postDeck);

router.route("/:deckId")
  .delete(deleteDeck);

export default router;