import { FC } from "react";
import formatDateStringVerbose from "../utils/formatDateStringVerbose";

interface Props {
  createdBy: string,
  createdAt: string
}

const CreatedByUserAt: FC<Props> = ({ createdBy, createdAt }) => {
  return (
    <div>
      Created by {createdBy} on {formatDateStringVerbose(createdAt)}
    </div>
  )
}

export default CreatedByUserAt;