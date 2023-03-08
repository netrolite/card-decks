import { FC } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { AiOutlineArrowLeft as BackArrow } from "react-icons/ai";

export interface IErrState {
  occurred: boolean,
  message?: string
}

interface Props {

}

const ErrorPage: FC<Props> = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;
  const message = error.message || "Something went wrong...";

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

export default ErrorPage;