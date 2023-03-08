import { FC, PropsWithChildren } from "react";

interface Props {
  tooltipText: string,
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const BtnWithTooltip: FC<PropsWithChildren<Props>> = ({ children, tooltipText, onClick }) => {
  return (
    <button
      className="btn gray btn-icon btn-tooltip"
      data-tooltip-text={tooltipText}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default BtnWithTooltip;