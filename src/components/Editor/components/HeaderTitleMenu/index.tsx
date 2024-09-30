import React, { useMemo } from "react";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import { svgProps } from "../../utils/getSideAnimateClassName";
import {
  CenterAlignmentOutlined,
  LeftAlignmentOutlined,
  RightAlignmentOutlined,
} from "../Icon";

const HeaderTitleMenu = () => {
  const items = useMemo<(Item | undefined)[]>(() => {
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
        tooltip: "Ctrl + Shift + R",
      },
    ];
  }, []);

  return <HorizontalMenu items={items} />;
};

export default HeaderTitleMenu;
