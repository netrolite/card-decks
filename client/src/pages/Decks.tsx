import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import formatDateString from "../utils/formatDateString";
import NewDeckForm from "../components/NewDeckForm";
import Deck from "../components/Deck";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import copyObj from "../utils/copyObj";

axios.defaults.baseURL = "http://localhost:4000";

export interface IDeckBase {
  name: string,
  createdBy: string,
}
export type IDeckToPost = IDeckBase
export interface IDeckToShowOnPage extends IDeckBase {
  createdAt: string
}
export interface IDeckInDB extends IDeckBase {
  createdAt: string,
  updatedAt: string,
  _id: string
}

const Decks = () => {
  const decks = useLoaderData() as IDeckToShowOnPage[];
  
  const decksNodes = decks.map(decksNodesCb);
  return (
    <>
      <NewDeckForm />
      <div className="decks">
        {decksNodes}
      </div>
    </>
  )
  
  function decksNodesCb(deck: IDeckToShowOnPage, i: number) {
    // modifying a property directly on the deck object causes that property to be different in the subsequent test render performed by react in strict mode
    const deckData = copyObj(deck);
    deckData.createdAt = formatDateString(deckData.createdAt);
    return <Deck {...deckData} key={i} />;
  }
}

export default Decks;

export async function decksLoader({ request, params }: LoaderFunctionArgs) {
  const { data: decks } = await axios.get<IDeckInDB[]>("/decks");
  return decks.reverse();
}

export async function decksAction({ request, params }: LoaderFunctionArgs) {
  const dataGetter = await request.formData();
  await axios.post("/decks", {
    name: dataGetter.get("name"),
    createdBy: dataGetter.get("createdBy")
  });

  return null; // must return some data or null from action function
}