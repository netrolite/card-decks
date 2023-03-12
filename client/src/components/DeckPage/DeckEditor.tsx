import axios from "axios";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrPage";

interface IDeckEditorProps {
  initContent: string,
  isSaving: boolean,
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
}

const DeckEditor: FC<IDeckEditorProps> = ({ initContent, isSaving, setIsSaving }) => {
  const { deckId } = useParams();
  const saveIntervalMs = 1000;

  const [content, setContent] = useState(initContent);
  const [lastSavedContent, setLastSavedContent] = useState(initContent);

  // for getting the latest values in setInterval callbacks (stale state)
  const contentRef = useRef("");
  const lastSavedContentRef = useRef("");
  const isSavingRef = useRef<boolean>()
  contentRef.current = content;
  lastSavedContentRef.current = lastSavedContent;
  isSavingRef.current = isSaving;

  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  useEffect(setSaveInterval, []);
  useEffect(setBeforeUnloadEventListener, []);
  useEffect(setHotkeys, []);

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
      await saveIfNeeded();
    }, saveIntervalMs);
    return () => clearInterval(interval);
  }

  async function saveIfNeeded() {
    if (contentRef.current === lastSavedContentRef.current) return;
    if (isSavingRef.current) return;
    await save();
  }

  async function save() {
    try {
      console.log("saving...");
      setIsSaving(true);
      await axios.patch(`decks/${deckId}`, { content: contentRef.current });
      setIsSaving(false);
      console.log("saved!");
      setLastSavedContent(contentRef.current);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not save the content" });
    }
  }

  function setBeforeUnloadEventListener() {
    window.addEventListener("beforeunload", cb);
    return () => window.removeEventListener("beforeunload", cb);

    function cb(e: BeforeUnloadEvent) {
      if (contentRef.current !== lastSavedContentRef.current) {
        save();
        e.preventDefault(); // MDN says to prevent default, but it seems to do nothing...
        // e.returnValue = "" is a convention. Browsers ignore it and show a generic message instead
        e.returnValue = ""; // show alert
      }
    }

  }

  function setHotkeys() {
    window.addEventListener("keydown", cb);
    return () => window.removeEventListener("keydown", cb);

    function cb(e: KeyboardEvent) {
      if ((e.metaKey && e.key === "s") || (e.ctrlKey && e.key === "s")) {
        e.preventDefault();
        saveIfNeeded();
      }
    }
  }
}

export default DeckEditor;
