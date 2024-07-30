import React from "react";
import Svg, { SvgProps } from "./Svg";

const LeftAlignmentOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M2 4a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm0 16a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm1-9a1 1 0 1 0 0 2h9a1 1 0 1 0 0-2H3Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default LeftAlignmentOutlined;
