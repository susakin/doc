import React from "react";
import Svg, { SvgProps } from "./Svg";

const H7Outlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm15.088 8.14a1.073 1.073 0 0 1-1.063-1.074c0-.587.476-1.053 1.064-1.053h5.535c.22 0 .4.18.4.4v1.405l-3.804 9.49c-.16.398-.62.658-1.049.658-.743 0-1.173-.753-.893-1.441l3.409-8.385h-3.599Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default H7Outlined;
