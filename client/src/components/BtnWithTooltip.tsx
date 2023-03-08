import { FC, PropsWithChildren } from "react";

interface Props {
  tooltipText: string
}

const BtnWithTooltip: FC<PropsWithChildren<Props>> = ({ children, tooltipText }) => {
  return (
    <button
      className="btn gray btn-icon btn-tooltip"
      data-tooltip-text={tooltipText}
    >
      {children}
    </button>
  )
}

export default BtnWithTooltip;