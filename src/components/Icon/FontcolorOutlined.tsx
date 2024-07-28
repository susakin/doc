import React from "react";
import Svg, { SvgProps } from "./Svg";

const FontcolorOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path d="M10.277 5.5L6 16.5h1.34l1.156-3.081h4.993l1.156 3.081H16l-4.277-11h-1.446zm-1.385 6.856l2.085-5.5h.061l2.055 5.5H8.892z"></path>
    </Svg>
  );
};

export default FontcolorOutlined;
