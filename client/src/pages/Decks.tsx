import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import formatDateString from "../utils/formatDateString";
import NewDeckForm from "../components/NewDeckForm";
import Deck from "../components/Deck";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import copyObj from "../utils/copyObj";
import { IErrState } from "./Error";

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
  const [decks, setDecks] = useState<IDeckToShowOnPage[]>([]);
  const [error, setError] = useState<IErrState>({ occurred: false });
  if (error.occurred) throw new Error(error.message);

  useEffect(() => {
    (async () => { await loadDecks() })();
  }, [])
  
  const decksNodes = decks.map(decksNodesCb);
  return (
    <>
      <NewDeckForm setDecks={setDecks} />
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

  async function loadDecks() {
    try {
      const { data: decks } = await axios.get<IDeckInDB[]>("/decks");
      setDecks(decks.reverse());
    } catch (err) {
      setError({ occurred: true, message: "Could not load decks" });
    }
  }
  
  async function decksAction({ request, params }: LoaderFunctionArgs) {
    const dataGetter = await request.formData();
    await axios.post("/decks", {
      name: dataGetter.get("name"),
      createdBy: dataGetter.get("createdBy")
    });
    
    return null; // must return some data or null from action function
  }
}

export default Decks;