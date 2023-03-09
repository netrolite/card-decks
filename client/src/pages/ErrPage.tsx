import { FC } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AiOutlineArrowLeft as BackArrow } from "react-icons/ai";

export interface IErrState {
  occurred: boolean,
  msg?: string
}

interface IErrPageProps {

}

const ErrPage: FC<IErrPageProps> = () => {
  const navigate = useNavigate();
  const err = useRouteError() as Error;
  const message = err.message || "Something went wrong...";

  return (
    <>
      <h1>Error</h1>
      <div className="err-message">{message}</div>
      <button
        className="btn primary mt-3 btn-icon-and-text"
        onClick={() => navigate(-1)}
      >
        <BackArrow /> Back
      </button>
    </>
  )
}

export default ErrPage;