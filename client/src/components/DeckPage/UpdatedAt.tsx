import { FC } from "react";
import timeElapsedSinceDate from "../../utils/timeElapsedSinceDate";

interface Props {
  createdAt: string,
  updatedAt: string
}

const UpdatedAt: FC<Props> = ({ createdAt, updatedAt }) => {
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


export default UpdatedAt;