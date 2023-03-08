import "../styles/Dialog.css";
import { FC } from "react";

interface Props {
  isActive: boolean,
  title: string,
  message?: string
  primaryButton: string,
  secondaryButton: string,
  onPrimaryButtonClick: () => void,
  onSecondaryButtonClick: () => void,
  isPrimaryButtonDangerous?: boolean,
  isSecondaryButtonDangerous?: boolean
}

const Dialog: FC<Props> = (
  {
    isActive,
    title,
    message,
    primaryButton,
    secondaryButton,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    isPrimaryButtonDangerous,
    isSecondaryButtonDangerous
  }
) => {
  return (
    <>
      <div className={`dialog-overlay${isActive ? " active" : ""}`}></div>
      <div className={`dialog${isActive ? " active" : ""}`}>
        <div className="dialog-title">{title}</div>
        {message && <div className="dialog-message">{message}</div>}

        <div className="dialog-buttons">
          <button
            onClick={onPrimaryButtonClick}
            className={`btn dialog-primary-btn ${isPrimaryButtonDangerous ? " dangerous" : ""}`}
          >
            {primaryButton}
          </button>
          <button
            onClick={onSecondaryButtonClick}
            className={`btn dialog-secondary-btn ${isSecondaryButtonDangerous ? " dangerous" : ""}`}
          >
            {secondaryButton}
          </button>
        </div>
      </div>
    </>
  )
}

export default Dialog;