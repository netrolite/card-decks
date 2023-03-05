import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"

interface IDeck {
  name: string
}

const App = () => {
  const [decks, setDecks] = useState<IDeck[]>([])

  useEffect(() => {
    (async () => {
      setDecks(await fetchDecks());
    })();
  }, [])
  console.log(decks);

  return (
    <div className="app">
      <div className="decks">
        { }
      </div>
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

export default App;