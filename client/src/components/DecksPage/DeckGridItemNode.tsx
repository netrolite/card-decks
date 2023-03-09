import { FC } from "react"
import { Link } from "react-router-dom"

interface IDeckGridItemNodeProps {
  name: string,
  createdBy: string,
  createdAt: string,
  _id: string
}

const DeckGridItemNode: FC<IDeckGridItemNodeProps> = ({ name, createdBy, createdAt, _id }) => {
  return (
    <li className="deck">
      <Link to={`/decks/${_id}`}>
        <div className="name">{name}</div>
        <div className="created-by">Created by {createdBy}</div>
        <div className="created-at">Created on {createdAt}</div>
      </Link>
    </li>
  )
}

export default DeckGridItemNode;