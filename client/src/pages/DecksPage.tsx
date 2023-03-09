import "../styles/DecksPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { IErrState } from "./ErrPage";
import LoadingSpinner from "../components/LoadingSpinner";
import NewDeckForm from "../components/DecksPage/NewDeckForm";
import DecksGrid from "../components/DecksPage/DecksGrid";
import { decksNodesCb } from "../components/DecksPage/helperFns";
import { IDeck } from "..";

axios.defaults.baseURL = "http://localhost:4000";

const DecksPage = () => {
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [err, setErr] = useState<IErrState>({ occurred: false });
  const [hasLoaded, setHasLoaded] = useState(false);
  if (err.occurred) throw new Error(err.msg);

  useEffect(() => { loadDecks() }, []);
  
  const decksNodes = decks.map(decksNodesCb);

  if (!hasLoaded) return <LoadingSpinner />;
  return (
    <>
      <NewDeckForm setDecks={setDecks} />
      <DecksGrid decksNodes={decksNodes} />
    </>
  )

  async function loadDecks() {
    try {
      const { data: decks } = await axios.get<IDeck[]>("/decks");
      setDecks(decks.reverse());
      setHasLoaded(true);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not load decks" });
    }
  }
}

export default DecksPage;
