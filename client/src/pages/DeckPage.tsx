import "../styles/DeckPage.css";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { IDeck } from "./DecksPage";
import { IErrState } from "./ErrorPage";
import UpdatedAt from "../components/UpdatedAt";
import CreatedByUserAt from "../components/CreatedByUserAt";

interface Props {

}

const DeckPage: FC<Props> = () => {
  const [deck, setDeck] = useState<IDeck>();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState<IErrState>({ occurred: false });
  if (error.occurred) throw new Error(error.message);
  const {deckId} = useParams();

  useEffect(() => { loadDeck() }, []);
  
  return (
    <div className={`content${hasLoaded ? "" : " loading"}`}>
      {
        deck ? (
          <>
            <h1>{deck.name}</h1>
            <div className="deck-meta">
              <CreatedByUserAt createdBy={deck.createdBy} createdAt={deck.createdAt} />      
              <UpdatedAt createdAt={deck.createdAt} updatedAt={deck.updatedAt} />
            </div>
          </>
        ) : <LoadingSpinner />
      }
    </div>
  )

  async function loadDeck() {
    try {
      const { data: deck } = await axios.get<IDeck>(`/decks/${deckId}`);
      setDeck(deck);
      setHasLoaded(true);
    } catch (err) {
      setError({ occurred: true, message: "Could not load deck" });
    }
  }
}

export default DeckPage;