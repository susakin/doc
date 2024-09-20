import { useState } from "react";
import { TypographyOutlined } from "../Icon";
import Typography from "../Typography";
import { svgProps } from "@/utils";

export const useTypography = () => {
  return {
    icon: <TypographyOutlined {...svgProps} />,
    submenu: <Typography />,
    devider: true,
  };
};
