import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDecks(req: Request, res: Response) {
  const decks = Deck.find({});
  res.status(200).json(decks);
}

export async function postDeck(req: Request, res: Response) {
  const deck = await Deck.create(req.body);
  res.status(200).json(deck);
}