import { Request, Response } from "express";
import { Card } from "../models/Card";

export async function getCards(req: Request, res: Response) {
  const cards = await Card.find({});
  res.status(200).json(cards);
}

export async function postCard(req: Request, res: Response) {
  const card = await Card.create(req.body);
  res.status(201).json(card);
}