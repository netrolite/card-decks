import "../styles/DeckPage.css";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { IDeck } from "..";
import { IErrState } from "./ErrPage";
import DeckHeader from "../components/DeckPage/DeckHeader";
import DeckMeta from "../components/DeckPage/DeckMeta";
import DeckEditor from "../components/DeckPage/DeckEditor";

interface IDeckPageProps {

}

const DeckPage: FC<IDeckPageProps> = () => {
  const [deck, setDeck] = useState<IDeck>();
  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);
  const { deckId } = useParams();

  useEffect(() => { loadDeck() }, []);
  
  if (!deck) return <LoadingSpinner />
  return (
    <>
      <DeckHeader name={deck.name} />
      <DeckMeta
        createdAt={deck.createdAt}
        createdBy={deck.createdBy}
        updatedAt={deck.updatedAt}
      />
      <DeckEditor initContent={deck.content} />
    </>
  )

  async function loadDeck() {
    try {
      const { data: deck } = await axios.get<IDeck>(`/decks/${deckId}`);
      if (!deck) throw new Error();
      setDeck(deck);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not load deck" });
    }
  }
}

export default DeckPage;
