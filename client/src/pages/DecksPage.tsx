import "../styles/DecksPage.css";
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import formatDateString from "../utils/formatDateString";
import NewDeckForm from "../components/DecksPage/NewDeckForm";
import Deck from "../components/DecksPage/Deck";
import copyObj from "../utils/copyObj";
import { IErrState } from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";

axios.defaults.baseURL = "http://localhost:4000";

export interface IDeck {
  name: string,
  createdBy: string,
  createdAt: string,
  updatedAt: string,
  _id: string
}

const DecksPage = () => {
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [error, setError] = useState<IErrState>({ occurred: false });
  const [hasLoaded, setHasLoaded] = useState(false);
  if (error.occurred) throw new Error(error.message);

  useEffect(() => { loadDecks() }, []);
  
  const decksNodes = decks.map(decksNodesCb);
  return (
    <>
      <NewDeckForm setDecks={setDecks} />
      <div className={`decks${hasLoaded ? "" : " loading"}`}>
        {hasLoaded ? decksNodes : <LoadingSpinner />}
      </div>
    </>
  )
  
  function decksNodesCb(deck: IDeck, i: number) {
    // modifying a property directly on the deck object causes that property to be different in the subsequent test renders performed by react in strict mode
    const deckData = copyObj(deck);
    deckData.createdAt = formatDateString(deckData.createdAt);
    return <Deck {...deckData} key={i} />;
  }

  async function loadDecks() {
    try {
      const { data: decks } = await axios.get<IDeck[]>("/decks");
      setDecks(decks.reverse());
      setHasLoaded(true);
    } catch (err) {
      setError({ occurred: true, message: "Could not load decks" });
    }
  }
}

export default DecksPage;