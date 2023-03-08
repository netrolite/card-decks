import { FC } from "react";
import BtnWithTooltip from "../BtnWithTooltip";
import { BsTrash3 as TrashIcon } from "react-icons/bs";

interface Props {
  name: string
}

const DeckHeader: FC<Props> = ({ name }) => {
  return (
    <header className="deck-header">
      <h1>{name}</h1>
      <div className="deck-actions">
        <BtnWithTooltip tooltipText="Delete">
          <TrashIcon />
        </BtnWithTooltip>
      </div>
    </header>
  )
}

export default DeckHeader;