import { useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"

const App = () => {
  useEffect(() => {
    (async () => {
      const data = await axios("/decks");
      console.log(data);
    })();
  }, [])

  return (
    <h1>hello</h1>
  )
}

export default App;