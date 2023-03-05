import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

interface IDeckBase {
  name: string,
  createdBy: string,
}

type IDeckToPost = IDeckBase

interface IDeckToShowOnPage extends IDeckBase {
  createdAt: string
}

interface IDeckInDB extends IDeckBase {
  createdAt: string,
  updatedAt: string,
  _id: string
}

const App = () => {
  const [deckToPost, setDeckToPost] = useState<IDeckToPost>(
    { name: "", createdBy: "" }
  );
  const [decks, setDecks] = useState<IDeckToShowOnPage[]>([]);
  const deckNameRef = useRef<HTMLInputElement>(null);
  const createdByRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setDecks(await fetchDecks() as IDeckToShowOnPage[]);
    })();
  }, [])

  
  console.log(deckToPost);
  const decksNodes = decks.map(decksNodesCb);
  return (
    <div id="app">
      <main>
        <form
          className="add-deck-form"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="deck-name">Deck name</label>
          <input
           type="text"
           name="deck-name"
           id="deck-name"
           data-prop="name"
           value={deckToPost.name}
           onChange={handleDeckToPostChange}
           ref={deckNameRef}
           />

          <label htmlFor="deck-name">Your name</label>
          <input
           type="text"
           name="deck-name"
           id="deck-name"
           data-prop="createdBy"
           value={deckToPost.createdBy}
           onChange={handleDeckToPostChange}
           ref={createdByRef}
           />
          <button className="btn-primary" type="submit">Add deck</button>
        </form>

        <div className="decks">
          {decksNodes}
        </div>
      </main>
    </div>
  )

  function handleDeckToPostChange(e: any) {
    const changedProp = e.target.dataset.prop;
    const value = e.target.value;
    setDeckToPost(prevState => (
      { ...prevState, [changedProp]: value }
    ))
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    postDeck(deckToPost);
    clearForm();
  }

  function clearForm() {
    (deckNameRef.current as HTMLInputElement).value = "";
    (createdByRef.current as HTMLInputElement).value = "";
  }
  
  async function fetchDecks() {
    try {
      const { data } = await axios.get<IDeckInDB[]>("/decks");
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  
  async function postDeck(deck: IDeckToPost | undefined) {
    try {
      const { data: deckFromDB } = await axios.post<IDeckInDB>("/decks", deck);
      console.log(deckFromDB);
      addDeckAfterSuccessfulPost(deckFromDB);
    } catch (err) {
      console.error(err);
    }
  }

  function addDeckAfterSuccessfulPost(deck: IDeckToShowOnPage) {
    setDecks(prevState => [deck, ...prevState]);
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
  
  function formatDateString(dateStr: string) {
    const date = new Date(dateStr);
    const dayOfMonth = getDayOfMonth(date);
    const monthNumber = getMonthNumber(date);
    const year = getLastTwoDigitsOfYear(date);
    return `${dayOfMonth}/${monthNumber}/${year}`;
  }
  
  function getDayOfMonth(date: Date) {
    return date.getDate();
  }
  
  function getMonthNumber(date: Date) {
    const monthOffset = 1;
    return date.getMonth() + monthOffset;
  }
  
  function getLastTwoDigitsOfYear(date: Date) {
    const fullYear = date.getFullYear();
    const fullYearSplit = fullYear.toString().split("");
    const lastTwoDigitsString = `${fullYearSplit[2]}${fullYearSplit[3]}`;
    return Number(lastTwoDigitsString);
  }
}



export default App;