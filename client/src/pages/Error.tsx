import { FC } from "react";
import { Link, useRouteError } from "react-router-dom";

interface Props {

}

const Error: FC<Props> = () => {
  const error = useRouteError() as Error;
  const message = error.message || "Something went wrong...";

  return (
    <>
      <h1>Error</h1>
      <div className="err-message">{message}</div>
      <Link to="/">
        <button className="btn-primary">Back to homepage</button>
      </Link>
    </>
  )
}

export default Error;