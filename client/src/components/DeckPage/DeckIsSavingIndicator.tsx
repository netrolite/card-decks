import { FC } from "react";
import SaveIcon from "../../assets/SaveIcon";

interface IDeckIsSavingIndicatorProps {
  isSaving: boolean
}

const DeckIsSavingIndicator: FC<IDeckIsSavingIndicatorProps> = ({ isSaving }) => {
  return (
    <div className="deck-is-saving-indicator">
      <SaveIcon /> {isSaving ? "Saving..." : "Saved!"}
    </div>
  )
}

export default DeckIsSavingIndicator;