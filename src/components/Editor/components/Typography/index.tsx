import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import {
  CenterAlignmentOutlined,
  LeftAlignmentOutlined,
  RightAlignmentOutlined,
} from "../Icon";
import { useIndentation } from "./useIndentation";
import { useAlign } from "../../plugin/align/useAlign";
import { svgProps } from "../../utils/getSideAnimateClassName";

const Typography: React.FC = () => {
  const indentationItems = useIndentation();
  const { align, commandAlign } = useAlign();

  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <LeftAlignmentOutlined {...svgProps} />,
        text: "左对齐",
        tooltip: "Ctrl + Shift + L",
        active: align?.align === "left" || align?.align === undefined,
        onClick() {
          commandAlign({ align: "left" });
        },
      },
      {
        icon: <CenterAlignmentOutlined {...svgProps} />,
        text: "居中对齐",
        tooltip: "Ctrl + Shift + E",
        active: align?.align === "center",
        onClick() {
          commandAlign({ align: "center" });
        },
      },
      {
        icon: <RightAlignmentOutlined {...svgProps} />,
        text: "右对齐",
        devider: true,
        tooltip: "Ctrl + Shift + R",
        active: align?.align === "right",
        onClick() {
          commandAlign({ align: "right" });
        },
      },
      ...indentationItems,
    ];
  }, [indentationItems]);
  return <Menu items={items} />;
};

export default Typography;
