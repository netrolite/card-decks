import { IDeck } from "../..";
import copyObj from "../../utils/copyObj";
import formatDateString from "../../utils/formatDateString";
import DeckGridItemNode from "./DeckGridItemNode";

export function decksNodesCb(deck: IDeck, i: number) {
  // modifying a property directly on the deck object causes that property to be different in the subsequent test renders performed by react in strict mode
  const deckData = copyObj(deck);
  deckData.createdAt = formatDateString(deckData.createdAt);
  return <DeckGridItemNode {...deckData} key={i} />;
}