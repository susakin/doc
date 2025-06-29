import React from "react";
import Svg, { SvgProps } from "./Svg";

const H4Outlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M2 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0v-7h9v7a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v7H3V4a1 1 0 0 0-1-1Zm19.681 7.19c0-.658-.486-1.19-1.143-1.19-.402 0-.824.204-1.043.542l-4.428 6.821a.266.266 0 0 0-.043.145v1.62c0 .22.18.4.4.4h4.404v1.363c0 .512.43.927.941.927a.914.914 0 0 0 .912-.927v-1.363h.4a.954.954 0 0 0 .943-.956.934.934 0 0 0-.944-.932h-.399v-6.45Zm-4.53 6.45 2.677-4.177v4.177H17.15Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default H4Outlined;
