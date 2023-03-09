import "../styles/DeckPage.css";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { IDeck } from "./DecksPage";
import { IErrState } from "./ErrPage";
import Dialog from "../components/Dialog";
import BtnWithTooltip from "../components/BtnWithTooltip";
import { BsTrash3 as TrashIcon } from "react-icons/bs";
import timeElapsedSinceDate from "../utils/timeElapsedSinceDate";
import formatDateStringVerbose from "../utils/formatDateStringVerbose";

interface IDeckPageProps {

}

const DeckPage: FC<IDeckPageProps> = () => {
  const [deck, setDeck] = useState<IDeck>();
  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);
  const {deckId} = useParams();

  useEffect(() => { loadDeck() }, []);
  
  if (!deck) return <LoadingSpinner />
  return (
    <>
      <DeckHeader name={deck.name} />
      <DeckMeta
        createdAt={deck.createdAt}
        createdBy={deck.createdBy}
        updatedAt={deck.updatedAt}
      />
    </>
  )

  async function loadDeck() {
    try {
      const { data: deck } = await axios.get<IDeck>(`/decks/${deckId}`);
      if (!deck) throw new Error();
      setDeck(deck);
    } catch (err) {
      setErr({ occurred: true, msg: "Could not load deck" });
    }
  }
}

export default DeckPage;


interface IDeckHeaderProps {
  name: string
}

const DeckHeader: FC<IDeckHeaderProps> = ({ name }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false);
  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

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
      setErr({ occurred: true, msg: "Could not delete deck" });
    }
  }

  function openDeleteDialog() {
    setIsDeleteDialogActive(true);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogActive(false);
  }
}


interface IDeckMetaProps {
  createdBy: string,
  createdAt: string,
  updatedAt: string
}

const DeckMeta: FC<IDeckMetaProps> = ({ createdAt, createdBy, updatedAt }) => {
  return (
    <div className="deck-meta">
      <CreatedByUserAt createdAt={createdAt} createdBy={createdBy} />
      <UpdatedAt createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  )
}


interface ICreatedByUserAtProps {
  createdBy: string,
  createdAt: string
}

const CreatedByUserAt: FC<ICreatedByUserAtProps> = ({ createdBy, createdAt }) => {
  return (
    <div>
      Created by {createdBy} on {formatDateStringVerbose(createdAt)}
    </div>
  )
}


interface IUpdatedAtProps {
  createdAt: string,
  updatedAt: string
}

const UpdatedAt: FC<IUpdatedAtProps> = ({ createdAt, updatedAt }) => {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);
  const createdAtMs = createdAtDate.getTime();
  const updatedAtMs = updatedAtDate.getTime();

  if (!hasBeenUpdated(createdAtMs, updatedAtMs)) {
    return <div></div>;
  }
  
  const timeElapsedSinceUpdate = timeElapsedSinceDate(updatedAtDate);
  return (
    <div>Updated {timeElapsedSinceUpdate} ago</div>
  )
}

function hasBeenUpdated(createdAtMs: number, updatedAtMs: number) {
  const now = Date.now();
  return (updatedAtMs > createdAtMs) && (now > updatedAtMs);
}