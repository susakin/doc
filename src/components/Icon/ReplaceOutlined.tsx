import React from "react";
import Svg, { SvgProps } from "./Svg";

const ReplaceOutlined: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <title>{props?.ariaLabel}</title>
      <path
        d="M17.074 18.185A8 8 0 0 1 4.091 10.79l.941.557a.5.5 0 0 0 .743-.536l-.718-3.345a.5.5 0 0 0-.633-.374l-3.277.982a.5.5 0 0 0-.111.91l1.228.725A10.03 10.03 0 0 0 2 12c0 5.523 4.477 10 10 10a9.966 9.966 0 0 0 6.9-2.761l-1.826-1.054ZM7.233 5.575a8 8 0 0 1 12.724 7.264l-1.097-.624a.5.5 0 0 0-.735.547l.776 3.333a.5.5 0 0 0 .638.363l3.26-1.036a.5.5 0 0 0 .096-.911l-1.075-.612c.118-.615.18-1.25.18-1.899 0-5.523-4.477-10-10-10a9.962 9.962 0 0 0-6.62 2.505l1.853 1.07Z"
        fill="currentColor"
      ></path>
    </Svg>
  );
};

export default ReplaceOutlined;
