import { useState, useRef, FormEvent, FC } from "react";
import type { IDeckToPost, IDeckInDB, IDeckToShowOnPage } from "../pages/Decks";
import axios, { all } from "axios";
import { Form, LoaderFunctionArgs } from "react-router-dom";

interface Props {
  
}

const NewDeckForm: FC<Props> = () => {
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
          autoComplete="off"
        />
      </div>
      <div className="input-group">
        <label htmlFor="deck-created-by">Your name</label>
        <input
          type="text"
          name="createdBy"
          id="deck-created-by"
        />
      </div>
      <button className="btn-primary" type="submit">Add deck</button>
    </Form>
  )
}

export default NewDeckForm;