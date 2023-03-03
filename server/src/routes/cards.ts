import express from "express";
const router = express.Router();
import { getCards, postCard } from "../controllers/cards";


router.route("/")
  .get(getCards)
  .post(postCard);

export default router;