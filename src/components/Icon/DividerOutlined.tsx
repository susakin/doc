import React from "react";
import Svg, { SvgProps } from "./Svg";

const DividerOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M9.5 4a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 16a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1ZM3 11a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Zm14-7a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm1 15a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3ZM2 4a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1Zm1 15a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H3Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default DividerOutlined;
