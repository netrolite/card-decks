import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrPage";
import BtnWithTooltip from "../BtnWithTooltip";
import Dialog from "../Dialog";
import axios from "axios";
import { BsTrash3 as TrashIcon } from "react-icons/bs";
import DeckIsSavingIndicator from "./DeckIsSavingIndicator";
import EditIcon from "../../assets/EditIcon";

interface IDeckHeaderProps {
  initDeckName: string
  isSaving: boolean
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
}

const DeckHeader: FC<IDeckHeaderProps> = ({ initDeckName, isSaving, setIsSaving }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deckName, setDeckName] = useState(initDeckName);
  const [lastSavedDeckName, setLastSavedDeckName] = useState(initDeckName);
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const changeNameTextarea = useRef<HTMLTextAreaElement>(null);

  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  useEffect(focusOnDeckNameTextareaAndMoveCursorToEnd, [isEditingName]);

  return (
    <header className="deck-header">
      <DeckIsSavingIndicator isSaving={isSaving} hide={isEditingName} />

      <div className="deck-name-container">
        {
          isEditingName ? (
            <>
              <textarea
                ref={changeNameTextarea}
                className="deck-name-editing-textarea"
                value={deckName}
                onChange={onDeckNameChange}
              />
              <button
                className="btn deck-name-save-btn"
                onClick={saveAndStopEditingName}
              >
                Save
              </button>
            </>
          ) : <h1 className="deck-name">{deckName}</h1>
        }
      </div>
      <div className="deck-actions">
        <BtnWithTooltip
          tooltipText="Edit name"
          onClick={() => setIsEditingName(true)}
          isDisabled={isEditingName ? true : false}
        >
          <EditIcon />
        </BtnWithTooltip>
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

  function onDeckNameChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setDeckName(e.target.value);
  }

  async function saveAndStopEditingName() {
    setIsEditingName(false);
    try {
      setIsSaving(true);
      if (deckName !== lastSavedDeckName) {
        await axios.patch(`/decks/${deckId}`, { name: deckName });
      };
      setLastSavedDeckName(deckName);
      setIsSaving(false);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not update deck" });
    }
  }

  async function deleteDeck() {
    try {
      await axios.delete(`decks/${deckId}`);
      navigate("/decks");
    } catch (err) {
      setErr({ occurred: true, msg: "Could not delete deck" });
    }
  }

  function focusOnDeckNameTextareaAndMoveCursorToEnd() {
    if (!isEditingName) return;
    const textarea = changeNameTextarea.current;
    if (!textarea) return;

    textarea.focus();
    const length = textarea.value.length;
    textarea.selectionStart = textarea.selectionEnd = length;
  }
}

export default DeckHeader;