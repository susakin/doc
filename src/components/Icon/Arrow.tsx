import React from "react";
import Svg, { SvgProps } from "./Svg";

const Arrow: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path d="M4.438 1.993L7.253 5.16a1 1 0 001.494 0l2.815-3.166A5.938 5.938 0 0116 0H0c1.696 0 3.311.725 4.438 1.993z"></path>
    </Svg>
  );
};

export default Arrow;
