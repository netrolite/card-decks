import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {

}

const NotFoundPage: FC<Props> = () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">
        <button className="btn-primary mt-3">Back to homepage</button>
      </Link>     
    </>
  )
}

export default NotFoundPage;