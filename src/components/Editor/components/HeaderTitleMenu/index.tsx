import React, { useMemo } from "react";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import { svgProps } from "../../utils/getSideAnimateClassName";
import {
  CenterAlignmentOutlined,
  LeftAlignmentOutlined,
  RightAlignmentOutlined,
} from "../Icon";
import { useAlign } from "../../plugin/align/useAlign";

const HeaderTitleMenu = () => {
  const { align, commandAlign } = useAlign();

  const items = useMemo<(Item | undefined)[]>(() => {
    return [
      {
        icon: <LeftAlignmentOutlined {...svgProps} />,
        tooltip: "Ctrl + Shift + L",
        active: align?.align === "left" || align?.align === undefined,
        onClick() {
          commandAlign({ align: "left" });
        },
      },
      {
        icon: <CenterAlignmentOutlined {...svgProps} />,
        tooltip: "Ctrl + Shift + E",
        active: align?.align === "center",
        onClick() {
          commandAlign({ align: "center" });
        },
      },
      {
        icon: <RightAlignmentOutlined {...svgProps} />,
        tooltip: "Ctrl + Shift + R",
        active: align?.align === "right",
        onClick() {
          commandAlign({ align: "right" });
        },
      },
    ];
  }, [align]);

  return <HorizontalMenu items={items} />;
};

export default HeaderTitleMenu;
