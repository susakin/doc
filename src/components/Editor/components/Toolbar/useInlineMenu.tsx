import { useState } from "react";
import { TextOutlined } from "../Icon";
import InlineMenu from "../InlineMenu";
import { svgProps } from "@/utils";

export const useInlineMenu = () => {
  return {
    icon: <TextOutlined {...svgProps} />,
    submenu: <InlineMenu />,
    devider: true,
  };
};
