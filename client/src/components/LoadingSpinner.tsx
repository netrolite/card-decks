import "../styles/LoadingSpinner.css";
import { FC } from "react";

interface Props {

}

// this component must be put inside an element with a fixed height
// e.g that element may change its height property using a class like "loading"
// the class can be applied when hasLoaded state is set to false
const LoadingSpinner: FC<Props> = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  )
}

export default LoadingSpinner;