import React from "react";
import Svg, { SvgProps } from "./Svg";

const ReduceIndentationOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M1 3a1 1 0 0 1 2 0v18a1 1 0 1 1-2 0V3Zm3.911 9.651a.8.8 0 0 1 0-1.302l4.824-3.445a.8.8 0 0 1 1.265.65V11h11a1 1 0 1 1 0 2H11v2.445a.8.8 0 0 1-1.265.651l-4.824-3.445Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default ReduceIndentationOutlined;
