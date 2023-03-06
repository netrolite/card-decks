import { FC } from "react"

interface Props {
  deck: {
    name: string,
    createdBy: string,
    createdAt: string,
  },
}

const Deck: FC<Props> = ({ deck }) => {
  return (
    <div className="deck">
      <div className="name">{deck.name}</div>
      <div className="created-by">Created by {deck.createdBy}</div>
      <div className="created-at">Created at {deck.createdAt}</div>
    </div>
  )
}

export default Deck;