import axios from "axios";
import { ChangeEvent, FC, FormEventHandler, RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrPage";

interface IDeckEditorProps {
  initContent: string
}

const DeckEditor: FC<IDeckEditorProps> = ({ initContent }) => {
  const { deckId } = useParams();
  const msToWaitBeforeSaving = 1000;

  const [content, setContent] = useState(initContent);
  const [lastSavedContent, setLastSavedContent] = useState(initContent);
  const [msSinceLastChange, setMsSinceLastChange] = useState(0);

  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  useEffect(setIntervalToUpdateMsSinceLastChange, []);
  useEffect(setBeforeUnloadEventListener, [msSinceLastChange]);
  useEffect(saveIfNeeded, [msSinceLastChange])
  
  return (
    <textarea
      className="deck-editor"
      onChange={onChange}
      value={content}
    />
  )
    
  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    setMsSinceLastChange(0);
  }

  function setBeforeUnloadEventListener() {
    window.addEventListener("beforeunload", showAlertIfNotSaved);
    return () => window.removeEventListener("beforeunload", showAlertIfNotSaved);

    function showAlertIfNotSaved(e: BeforeUnloadEvent) {
      if (content !== lastSavedContent) {
        save();
        // e.returnValue = "" is a convention. Browsers ignore it and show a generic message
        e.preventDefault(); // MDN says to prevent default, but it seems to do nothing...
        e.returnValue = ""; // show alert
      }
    }

  }

  function setIntervalToUpdateMsSinceLastChange(intervalMs: number = 50) {
    const interval = setInterval(() => {
      setMsSinceLastChange(prevTime => prevTime += intervalMs);
    }, intervalMs)

    return () => clearInterval(interval);
  }

  function saveIfNeeded() {
    (async () => {
      if (msSinceLastChange < msToWaitBeforeSaving) return;
      if (content === lastSavedContent) return;
      save();
    })();
  }
  
  async function save() {
    try {
      console.log("saving...");
      await axios.patch(`decks/${deckId}`, { content });
      setLastSavedContent(content);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not save the content" });
    }
  }
}

export default DeckEditor;