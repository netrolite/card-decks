import "../styles/DecksPage.css";
import { useState, useEffect, FormEvent, FC } from "react";
import axios from "axios";
import formatDateString from "../utils/formatDateString";
import copyObj from "../utils/copyObj";
import { IErrState } from "./ErrorPage";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

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

  if (!hasLoaded) return <LoadingSpinner />
  return (
    <>
      <NewDeckForm setDecks={setDecks} />
      <Decks decksNodes={decksNodes} />
    </>
  )
  
  function decksNodesCb(deck: IDeck, i: number) {
    // modifying a property directly on the deck object causes that property to be different in the subsequent test renders performed by react in strict mode
    const deckData = copyObj(deck);
    deckData.createdAt = formatDateString(deckData.createdAt);
    return <DeckNode {...deckData} key={i} />;
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


interface INewDeckFormProps {
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>
}

interface IFormData {
  name: string,
  createdBy: string
}

const NewDeckForm: FC<INewDeckFormProps> = ({ setDecks }) => {
  const [formData, setFormData] = useState<IFormData>({ name: "", createdBy: "" });
  const [error, setError] = useState<IErrState>({ occurred: false });
  if (error.occurred) throw new Error(error.message);

  return (
    <form
      className="add-deck-form"
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <label htmlFor="name">Deck name</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="created-by">Your name</label>
        <input
          type="text"
          name="createdBy"
          id="created-by"
          value={formData.createdBy}
          onChange={handleChange}
        />
      </div>
      <button className="btn primary" type="submit">Add deck</button>
    </form>
  )

  function handleChange(e: FormEvent) {
    const changedProp = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setFormData(prev => ({ ...prev, [changedProp]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const deck = await postDeck();
    if (deck) addPostedDeckToDecksState(deck);
    clearForm();
  }

  async function postDeck() {
    try {
      const { data: deck } = await axios.post<IDeck>("/decks", formData);
      return deck;
    } catch (err) {
      setError({ occurred: true, message: "Could not send data to the server" })
    }
  }

  function addPostedDeckToDecksState(deck: IDeck) {
    setDecks(prev => [deck, ...prev]);
  }

  function clearForm() {
    setFormData({ name: "", createdBy: "" });
  }
}


interface IDecksProps {
  decksNodes: JSX.Element[]
}

const Decks: FC<IDecksProps> = ({ decksNodes }) => {
  return (
    <div className={`decks${decksNodes.length ? "" : " no-decks"}`}>
      {
        decksNodes.length
        ? decksNodes
        : "You have not created any decks yet"
      }
    </div>
  )
}

interface IDeckNodeProps {
  name: string,
  createdBy: string,
  createdAt: string,
  _id: string
}

const DeckNode: FC<IDeckNodeProps> = ({ name, createdBy, createdAt, _id }) => {
  return (
    <Link to={`/decks/${_id}`}>
      <div className="deck">
        <div className="name">{name}</div>
        <div className="created-by">Created by {createdBy}</div>
        <div className="created-at">Created on {createdAt}</div>
      </div>
    </Link>
  )
}

export default DecksPage;