import { FC } from "react";

interface IDecksGridProps {
  decksNodes: JSX.Element[]
}

const DecksGrid: FC<IDecksGridProps> = ({ decksNodes }) => {
  return (
    <ul className={`decks${decksNodes.length ? "" : " no-decks"}`}>
      {
        decksNodes.length
        ? decksNodes
        : "You have not created any decks yet"
      }
    </ul>
  )
}

export default DecksGrid;