import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrPage";
import BtnWithTooltip from "../BtnWithTooltip";
import Dialog from "../Dialog";
import axios from "axios";
import { BsTrash3 as TrashIcon } from "react-icons/bs";
import DeckIsSavingIndicator from "./DeckIsSavingIndicator";

interface IDeckHeaderProps {
  name: string
  isSaving: boolean
}

const DeckHeader: FC<IDeckHeaderProps> = ({ name, isSaving }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false);

  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  return (
    <header className="deck-header">
      <DeckIsSavingIndicator isSaving={isSaving} />

      <h1 className="deck-name">{name}</h1>
      <div className="deck-actions">
        <BtnWithTooltip tooltipText="Delete" onClick={() => setIsDeleteDialogActive(true)}>
          <TrashIcon />
        </BtnWithTooltip>
      </div>
      <Dialog
        isActive={isDeleteDialogActive}
        setIsActive={setIsDeleteDialogActive}
        title="This deck will be permanently deleted"
        okButtonText="Delete"
        onOk={deleteDeck}
        useRedBgColorForOkButton={true}
      />
    </header>
  )

  async function deleteDeck() {
    try {
      await axios.delete(`decks/${deckId}`);
      navigate("/decks");
    } catch (err) {
      setErr({ occurred: true, msg: "Could not delete deck" });
    }
  }
}

export default DeckHeader;