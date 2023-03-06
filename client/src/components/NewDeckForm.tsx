import { useState, useRef, FormEvent, FC } from "react";
import type { IDeckToPost, IDeckInDB, IDeckToShowOnPage } from "../Router";
import axios from "axios";

interface Props {
  setDecks: React.Dispatch<React.SetStateAction<IDeckToShowOnPage[]>>
}

const NewDeckForm: FC<Props> = ({ setDecks }) => {
  const [deckToPost, setDeckToPost] = useState<IDeckToPost>(
    { name: "", createdBy: "" }
  );
  const deckNameRef = useRef<HTMLInputElement>(null);
  const createdByRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="add-deck-form"
      onSubmit={handleFormSubmit}
    >
      <div className="input-group">
        <label htmlFor="deck-name">Deck name</label>
        <input
          type="text"
          name="deck-name"
          id="deck-name"
          data-prop="name"
          value={deckToPost.name}
          onChange={handleDeckToPostChange}
          ref={deckNameRef}
          autoComplete="off"
        />
      </div>
      <div className="input-group">
        <label htmlFor="deck-created-by">Your name</label>
        <input
          type="text"
          name="deck-name"
          id="deck-created-by"
          data-prop="createdBy"
          value={deckToPost.createdBy}
          onChange={handleDeckToPostChange}
          ref={createdByRef}
        />
      </div>
      <button className="btn-primary" type="submit">Add deck</button>
    </form>
  )

  function handleDeckToPostChange(e: any) {
    const changedProp = e.target.dataset.prop;
    const value = e.target.value;
    setDeckToPost(prevState => (
      { ...prevState, [changedProp]: value }
    ))
  }

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    await postDeck(deckToPost);
    clearForm();
  }

  async function postDeck(deck: IDeckToPost) {
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

  function clearForm() {
    setDeckToPost({ name: "", createdBy: "" });
  }
}

export default NewDeckForm;