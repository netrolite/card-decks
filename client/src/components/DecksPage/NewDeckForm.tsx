import axios from "axios";
import { FC, FormEvent, useState } from "react";
import { IDeck } from "../..";
import { IErrState } from "../../pages/ErrPage";

interface INewDeckFormProps {
  setDecks: React.Dispatch<React.SetStateAction<IDeck[]>>
}

interface IFormData {
  name: string,
  createdBy: string
}

interface IFormErr {
  show: boolean,
  msg: string
}

const NewDeckForm: FC<INewDeckFormProps> = ({ setDecks }) => {
  const [formData, setFormData] = useState<IFormData>({ name: "", createdBy: "" });
  const [formErr, setFormErr] = useState<IFormErr>({ show: false, msg: "" });
  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  return (
    <form
      className="add-deck-form"
      onSubmit={onSubmit}
    >
      <div className="input-group">
        <label htmlFor="name">Deck name</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={formData.name}
          onChange={onChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="created-by">Your name</label>
        <input
          type="text"
          name="createdBy"
          id="created-by"
          value={formData.createdBy}
          onChange={onChange}
        />
      </div>
      <div className="form-err">
        {formErr.show && formErr.msg}
      </div>
      <button className="btn primary" type="submit">Add deck</button>
    </form>
  )

  function onChange(e: FormEvent) {
    const changedProp = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setFormData(prev => ({ ...prev, [changedProp]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isFormDataValid()) {
      const msg = "Form filled out incorrectly";
      return setFormErr({ show: true, msg: msg });
    }
    setFormErr({ show: false, msg: "" });
    const deck = await postDeck();
    if (deck) addPostedDeckToDecksState(deck);
    clearForm();
  }

  function isFormDataValid() {
    const values = Object.values(formData);
    return values.every(val => val !== "");
  }

  async function postDeck() {
    try {
      const { data: deck } = await axios.post<IDeck>("/decks", formData);
      return deck;
    } catch (err) {
      setErr({ occurred: true, msg: "Could not send data to the server" })
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