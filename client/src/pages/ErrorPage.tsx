import { FC } from "react";
import { Link, useRouteError } from "react-router-dom";

export interface IErrState {
  occurred: boolean,
  message?: string
}

interface Props {

}

const ErrorPage: FC<Props> = () => {
  const error = useRouteError() as Error;
  const message = error.message || "Something went wrong...";
  const isAtRootUrl = location.pathname === "/";

  return (
    <>
      <h1>Error</h1>
      <div className="err-message">{message}</div>
      { !isAtRootUrl && <BackToHomeBtn /> }
    </>
  )
}

export const BackToHomeBtn = () => {
  return (
    <Link to="/">
      <button className="btn-primary mt-3">Back to homepage</button>
    </Link>
  )
}

export default ErrorPage;