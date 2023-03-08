import { Request, Response } from "express";
import Deck from "../models/Deck";
import { NotFoundErr } from "../utils/errors";

export async function getDecks(req: Request, res: Response) {
  const decks = await Deck.find({});
  res.status(200).json(decks);
}

export async function getDeckById(req: Request, res: Response) {
  const { deckId } = req.params;
  const result = await Deck.findById(deckId);
  setTimeout(() => {
    
    res.status(200).json(result);
  }, 10000)
}

export async function postDeck(req: Request, res: Response) {
  const deck = await Deck.create(req.body);
  res.status(200).json(deck);
}

export async function deleteDeck(req: Request, res: Response) {
  const { deckId } = req.params;
  const result = await Deck.deleteOne({ _id: deckId });

  if (result.deletedCount === 0) {
    throw new NotFoundErr("deck not found");
  }
  
  res.status(204).end();
}
