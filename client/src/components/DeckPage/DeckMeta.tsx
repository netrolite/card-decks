import { FC } from "react";
import CreatedByUserAt from "./CreatedByUserAt";
import UpdatedAt from "./UpdatedAt";

interface Props {
  createdBy: string,
  createdAt: string,
  updatedAt: string
}

const DeckMeta: FC<Props> = ({ createdAt, createdBy, updatedAt }) => {
  return (
    <div className="deck-meta">
      <CreatedByUserAt createdAt={createdAt} createdBy={createdBy} />
      <UpdatedAt createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  )
}

export default DeckMeta;