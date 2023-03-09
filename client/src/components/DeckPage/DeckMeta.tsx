import { FC } from "react"
import formatDateStringVerbose from "../../utils/formatDateStringVerbose"
import timeElapsedSinceDate from "../../utils/timeElapsedSinceDate"
import { hasBeenUpdated } from "./helperFns"

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

export default DeckMeta;


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
