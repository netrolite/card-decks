import { FC } from "react";
import SaveIcon from "../../assets/SaveIcon";

interface IDeckIsSavingIndicatorProps {
  isSaving: boolean,
  hide: boolean
}

const DeckIsSavingIndicator: FC<IDeckIsSavingIndicatorProps> = ({ isSaving, hide }) => {

  if (hide) return <></>;
  return (
    <div className="deck-is-saving-indicator">
      <SaveIcon /> {isSaving ? "Saving..." : "Saved!"}
    </div>
  )
}

export default DeckIsSavingIndicator;