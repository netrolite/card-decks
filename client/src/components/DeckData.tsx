import { FC } from "react";
import { IDeck } from "../pages/DecksPage";
import CreatedByUserAt from "./CreatedByUserAt";
import UpdatedAt from "./UpdatedAt";

interface Props {
  deck: IDeck
}

const DeckData: FC<Props> = ({ deck }) => {
  const { name, createdAt, createdBy, updatedAt } = deck;
  const metaData = { createdAt, createdBy, updatedAt };

  return (
    <>
      <h1>{name}</h1>
      <div className="deck-meta">
        <CreatedByUserAt {...metaData} />
        <UpdatedAt {...metaData} />
      </div>
    </>
  )
}

export default DeckData;