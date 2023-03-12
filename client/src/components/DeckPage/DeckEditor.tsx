import axios from "axios";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrPage";

interface IDeckEditorProps {
  initContent: string
}

const DeckEditor: FC<IDeckEditorProps> = ({ initContent }) => {
  const { deckId } = useParams();
  const saveIntervalMs = 1000;

  const [content, setContent] = useState(initContent);
  const [lastSavedContent, setLastSavedContent] = useState(initContent);

  // for getting the latest values in setInterval callbacks (stale state)
  const contentRef = useRef("");
  const lastSavedContentRef = useRef("");
  contentRef.current = content;
  lastSavedContentRef.current = lastSavedContent;

  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  useEffect(setSaveInterval, []);
  useEffect(setBeforeUnloadEventListener, []);
  
  return (
    <textarea
      className="deck-editor"
      onChange={onChange}
      value={content}
    />
  )
    
  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function setSaveInterval() {
    const interval = setInterval(async () => {
      const content = contentRef.current;
      const lastSavedContent = lastSavedContentRef.current;
      await saveIfContentDiffers(content, lastSavedContent);
    }, saveIntervalMs);
    return () => clearInterval(interval);
  }

  async function saveIfContentDiffers(content: string, lastSavedContent: string) {
    if (content === lastSavedContent) return;
    await save(content, lastSavedContent);
  }

  async function save(content: string, lastSavedContent: string) {
    try {
      console.log("saving...");
      await axios.patch(`decks/${deckId}`, { content });
      console.log("saved!");
      setLastSavedContent(content);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not save the content" });
    }
  }

  function setBeforeUnloadEventListener() {
    window.addEventListener("beforeunload", cb);
    return () => window.removeEventListener("beforeunload", cb);

    function cb(e: BeforeUnloadEvent) {
      const content = contentRef.current;
      const lastSavedContent = lastSavedContentRef.current;

      if (content !== lastSavedContent) {
        save(content, lastSavedContent);
        e.preventDefault(); // MDN says to prevent default, but it seems to do nothing...
        // e.returnValue = "" is a convention. Browsers ignore it and show a generic message instead
        e.returnValue = ""; // show alert
      }
    }

  }
}

export default DeckEditor;
