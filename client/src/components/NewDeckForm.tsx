import { useState, FormEvent, FC } from "react";
import type { IDeck } from "../pages/DecksPage";
import axios from "axios";
import { IErrState } from "../pages/ErrorPage";

interface Props {
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>
}

interface IFormData {
  name: string,
  createdBy: string
}

const NewDeckForm: FC<Props> = ({ setDecks }) => {
  const [formData, setFormData] = useState<IFormData>({ name: "", createdBy: "" });
  const [error, setError] = useState<IErrState>({ occurred: false });
  if (error.occurred) throw new Error(error.message);

  return (
    <form
      className="add-deck-form"
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <label htmlFor="name">Deck name</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="created-by">Your name</label>
        <input
          type="text"
          name="createdBy"
          id="created-by"
          value={formData.createdBy}
          onChange={handleChange}
        />
      </div>
      <button className="btn-primary" type="submit">Add deck</button>
    </form>
  )

  function handleChange(e: FormEvent) {
    const changedProp = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setFormData(prev => ({ ...prev, [changedProp]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const deck = await postDeck();
    if (deck) addPostedDeckToDecksState(deck);
    clearForm();
  }

  async function postDeck() {
    try {
      const { data: deck } = await axios.post<IDeck>("/decks", formData);
      return deck;
    } catch (err) {
      setError({ occurred: true, message: "Could not send data to the server" })
    }
  }

  function addPostedDeckToDecksState(deck: IDeck) {
    setDecks(prev => [deck, ...prev]);
  }

  function clearForm() {
    setFormData({ name: "", createdBy: "" });
  }
}

export default NewDeckForm;