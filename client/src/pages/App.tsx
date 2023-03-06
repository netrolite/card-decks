import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import formatDateString from "../utils/formatDateString";
import NewDeckForm from "../components/NewDeckForm";

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

const App = () => {
  const [decks, setDecks] = useState<IDeckToShowOnPage[]>([]);

  useEffect(() => {
    (async () => {
      setDecks(await fetchDecks() as IDeckToShowOnPage[]);
    })();
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

  async function fetchDecks() {
    try {
      const { data } = await axios.get<IDeckInDB[]>("/decks");
      return data.reverse();
    } catch (err) {
      console.error(err);
    }
  }
  
  function decksNodesCb(deck: IDeckToShowOnPage, i: number) {
    const createdAt = formatDateString(deck.createdAt);
    return (
      <div className="deck" key={i}>
        <div className="name">{deck.name}</div>
        <div className="created-by">Created by {deck.createdBy}</div>
        <div className="created-at">Created at {createdAt}</div>
      </div>
    )
  }
}

export default App;