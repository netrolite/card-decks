import { FC } from "react"
import { Link } from "react-router-dom";

interface Props {
  name: string,
  createdBy: string,
  createdAt: string,
  _id: string
}

const Deck: FC<Props> = ({ name, createdBy, createdAt, _id }) => {
  return (
    <Link to={`/decks/${_id}`}>
      <div className="deck">
        <div className="name">{name}</div>
        <div className="created-by">Created by {createdBy}</div>
        <div className="created-at">Created on {createdAt}</div>
      </div>
    </Link>
  )
}

export default Deck;