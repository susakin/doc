import React from "react";
import Svg, { SvgProps } from "./Svg";

const TitleViewOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M2 11a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H2Zm6 0a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H8Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default TitleViewOutlined;
