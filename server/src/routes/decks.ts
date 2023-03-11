import express from "express";
const router = express.Router();
import { getDecks, getDeckById, postDeck, patchDeck, deleteDeck } from "../controllers/decks";

router.route("/")
  .get(getDecks)
  .post(postDeck);

router.route("/:deckId")
  .get(getDeckById)
  .patch(patchDeck)
  .delete(deleteDeck);

export default router;