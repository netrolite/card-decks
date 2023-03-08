import { FC, PropsWithChildren, useRef, useState } from "react";
import BtnWithTooltip from "../BtnWithTooltip";
import { BsTrash3 as TrashIcon } from "react-icons/bs";
import Dialog from "../Dialog";
import { useNavigate, useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrorPage";
import axios from "axios";

interface Props {
  name: string
}

const DeckHeader: FC<Props> = ({ name }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false);
  const [error, setError] = useState<IErrState>({ occurred: false });
  if (error.occurred) throw new Error(error.message);

  return (
    <header className="deck-header">

      <h1 className="deck-name">{name}</h1>
      <div className="deck-actions">
        <BtnWithTooltip tooltipText="Delete" onClick={openDeleteDialog}>
          <TrashIcon />
        </BtnWithTooltip>
      </div>
      <Dialog
        isActive={isDeleteDialogActive}
        title="This deck will be permanently deleted"
        primaryButton="Cancel"
        secondaryButton="Delete"
        onPrimaryButtonClick={closeDeleteDialog}
        onSecondaryButtonClick={deleteDeck}
        isSecondaryButtonDangerous={true}
      />
    </header>
  )

  async function deleteDeck() {
    try {
      await axios.delete(`decks/${deckId}`);
      navigate("/decks");
    } catch (err) {
      setError({ occurred: true, message: "Could not delete deck" });
    }
  }

  function openDeleteDialog() {
    setIsDeleteDialogActive(true);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogActive(false);
  }
}

export default DeckHeader;