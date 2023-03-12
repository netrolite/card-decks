import "../styles/DeckPage.css";
import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
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
  const { deckId } = useParams();

  const [deck, setDeck] = useState<IDeck>();
  const [isSaving, setIsSaving] = useState(false);
  
  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  useEffect(() => { loadDeck() }, []);
  
  if (!deck) return <LoadingSpinner />
  return (
    <>
      <DeckHeader
        initDeckName={deck.name}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
      />
      <DeckMeta
        createdAt={deck.createdAt}
        createdBy={deck.createdBy}
        updatedAt={deck.updatedAt}
      />
      <DeckEditor
        initContent={deck.content}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
      />
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
