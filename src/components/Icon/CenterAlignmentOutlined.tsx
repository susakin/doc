import React from "react";
import Svg, { SvgProps } from "./Svg";

const CenterAlignmentOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 16a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm6-9a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default CenterAlignmentOutlined;
