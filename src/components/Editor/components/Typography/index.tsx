import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import {
  CenterAlignmentOutlined,
  LeftAlignmentOutlined,
  RightAlignmentOutlined,
} from "../Icon";
import { svgProps } from "@/utils";
import { useIndentation } from "./useIndentation";

const Typography: React.FC = () => {
  const indentationItems = useIndentation();

  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <LeftAlignmentOutlined {...svgProps} />,
        text: "左对齐",
        active: true,
        tooltip: "Ctrl + Shift + L",
      },
      {
        icon: <CenterAlignmentOutlined {...svgProps} />,
        text: "居中对齐",
        tooltip: "Ctrl + Shift + E",
      },
      {
        icon: <RightAlignmentOutlined {...svgProps} />,
        text: "右对齐",
        devider: true,
        tooltip: "Ctrl + Shift + R",
      },
      ...indentationItems,
    ];
  }, [indentationItems]);
  return <Menu items={items} />;
};

export default Typography;
