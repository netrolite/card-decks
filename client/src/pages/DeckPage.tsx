import "../styles/DeckPage.css";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { IDeck } from "./DecksPage";
import { IErrState } from "./ErrorPage";
import DeckHeader from "../components/DeckPage/DeckHeader";
import DeckMeta from "../components/DeckPage/DeckMeta";

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
    <div className={`deck-page${hasLoaded ? "" : " loading"}`}>
      {
        deck ? (
          <>
            <DeckHeader name={deck.name} />
            <DeckMeta
              createdAt={deck.createdAt}
              createdBy={deck.createdBy}
              updatedAt={deck.updatedAt}
            />
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