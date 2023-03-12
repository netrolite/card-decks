import { FC, PropsWithChildren } from "react";

interface Props {
  tooltipText: string,
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
  isDisabled?: boolean
}

const BtnWithTooltip: FC<PropsWithChildren<Props>> = (
  { children, tooltipText, onClick, isDisabled = false }
) => {
  return (
    <button
      className="btn gray btn-icon btn-tooltip"
      data-tooltip-text={tooltipText}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default BtnWithTooltip;