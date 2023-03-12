import "../styles/Dialog.css";
import { FC, useEffect, useRef } from "react";

interface Props {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  title: string,
  msg?: string
  onOk: () => void,
  okButtonText?: string,
  cancelButtonText?: string
  useRedBgColorForOkButton?: boolean
}

const Dialog: FC<Props> = ({
  isActive,
  setIsActive,
  title,
  msg,
  onOk,
  okButtonText = "Ok",
  cancelButtonText = "Cancel",
  useRedBgColorForOkButton = false
}) => {
  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;

  useEffect(setupEscHotkey, [])

  function closeDialog() { setIsActive(false); }

  return (
    <>
      <div
        className={`dialog-overlay${isActive ? " active" : ""}`}
        onClick={closeDialog}
      ></div>

      <div
        aria-hidden={isActive ? false : true}
        className={`dialog${isActive ? " active" : ""}`}
      >
        <div className="dialog-title">{title}</div>
        {msg && <div className="dialog-message">{msg}</div>}

        <div className="dialog-buttons">
          <button
            onClick={closeDialog}
            className={`btn dialog-primary-btn`}
            tabIndex={isActive ? 0 : -1}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onOk}
            className={`btn dialog-secondary-btn${useRedBgColorForOkButton ? " dangerous" : ""}`}
            tabIndex={isActive ? 0 : -1}
          >
            {okButtonText}
          </button>
        </div>
      </div>
    </>
  )

  function setupEscHotkey() {
    window.addEventListener("keydown", cb);
    return () => window.removeEventListener("keydown", cb);

    function cb(e: KeyboardEvent) {
      const isActive = isActiveRef.current;
      if (!isActive) return;
      
      if (e.key === "Escape") {
        closeDialog();
      } else if (e.key === "Enter") {
        onOk();
      }
    }
  }
}

export default Dialog;