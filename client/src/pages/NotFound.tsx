import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {

}

const NotFound: FC<Props> = () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">
        <button className="btn-primary">Back to homepage</button>
      </Link>     
    </>
  )
}

export default NotFound;