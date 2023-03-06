import { useState, useRef, FormEvent, FC } from "react";
import type { IDeckToPost, IDeckInDB, IDeckToShowOnPage } from "../pages/Decks";
import axios, { all } from "axios";
import { Form, LoaderFunctionArgs } from "react-router-dom";

interface Props {
  
}

const NewDeckForm: FC<Props> = () => {
  const [deckToPost, setDeckToPost] = useState<IDeckToPost>(
    { name: "", createdBy: "" }
  );
  const deckNameRef = useRef<HTMLInputElement>(null);
  const createdByRef = useRef<HTMLInputElement>(null);

  return (
    <Form
      className="add-deck-form"
      method="post"
    >
      <div className="input-group">
        <label htmlFor="deck-name">Deck name</label>
        <input
          type="text"
          name="name"
          id="deck-name"
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
          name="createdBy"
          id="deck-created-by"
          value={deckToPost.createdBy}
          onChange={handleDeckToPostChange}
          ref={createdByRef}
        />
      </div>
      <button className="btn-primary" type="submit">Add deck</button>
    </Form>
  )

  function handleDeckToPostChange(e: any) {
    const changedProp = e.target.name;
    const value = e.target.value;
    setDeckToPost(prevState => (
      { ...prevState, [changedProp]: value }
    ))
  }

  async function postDeck(deck: IDeckToPost) {
    try {
      const { data: deckFromDB } = await axios.post<IDeckInDB>("/decks", deck);
      console.log(deckFromDB);
      // addDeckAfterSuccessfulPost(deckFromDB);
    } catch (err) {
      console.error(err);
    }
  }

  function clearForm() {
    setDeckToPost({ name: "", createdBy: "" });
  }
}

export async function decksAction({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const allData = formData.get("name");
  return null;
}

export default NewDeckForm;