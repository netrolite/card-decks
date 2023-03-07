import { FC } from "react"

interface Props {
  name: string,
  createdBy: string,
  createdAt: string,
}

const Deck: FC<Props> = ({ name, createdBy, createdAt }) => {
  return (
    <div className="deck">
      <div className="name">{name}</div>
      <div className="created-by">Created by {createdBy}</div>
      <div className="created-at">Created on {createdAt}</div>
    </div>
  )
}

export default Deck;