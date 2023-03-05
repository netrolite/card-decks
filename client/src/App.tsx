import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"

interface IDeck {
  name: string,
  createdBy: string,
  createdAt: string
}


const App = () => {
  const [decks, setDecks] = useState<IDeck[]>([])

  useEffect(() => {
    (async () => {
      setDecks(await fetchDecks());
    })();
  }, [])

  const decksNodes = decks.map(decksNodesCb);
  return (
    <div id="app">
      <main>
        <div className="decks">
          {decksNodes}
        </div>
      </main>
    </div>
  )
}


async function fetchDecks() {
  try {
    const { data } = await axios.get("/decks");
    return data;
  } catch (err) {
    console.error(err);
  }
}

function decksNodesCb(deck: IDeck, i: number) {
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

export default App;