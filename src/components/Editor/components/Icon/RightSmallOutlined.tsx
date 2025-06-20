import React from "react";
import Svg, { SvgProps } from "./Svg";

const RightSmallOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M7.293 4.293a1 1 0 0 0 0 1.414L13.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default RightSmallOutlined;
