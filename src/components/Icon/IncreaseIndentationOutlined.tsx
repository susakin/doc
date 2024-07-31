import React from "react";
import Svg, { SvgProps } from "./Svg";

const IncreaseIndentationOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M21 3a1 1 0 1 1 2 0v18a1 1 0 1 1-2 0V3Zm-1.911 9.651a.8.8 0 0 0 0-1.302l-4.824-3.445a.8.8 0 0 0-1.265.65V11H2a1 1 0 1 0 0 2h11v2.445a.8.8 0 0 0 1.265.651l4.824-3.445Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default IncreaseIndentationOutlined;
