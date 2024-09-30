import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import {
  H4Outlined,
  H5Outlined,
  H6Outlined,
  H7Outlined,
  H8Outlined,
  H9Outlined,
} from "../Icon";
import { svgProps } from "../../utils/getSideAnimateClassName";

const TitleMenu: React.FC = () => {
  const menus = useMemo<Item[]>(() => {
    return [
      {
        icon: <H4Outlined {...svgProps} />,
        text: "四级标题",
        tooltip: "Ctrl + Alt + 4",
      },
      {
        icon: <H5Outlined {...svgProps} />,
        text: "五级标题",
        tooltip: "Ctrl + Alt + 5",
      },
      {
        icon: <H6Outlined {...svgProps} />,
        text: "六级标题",
        tooltip: "Ctrl + Alt + 6",
      },
      {
        icon: <H7Outlined {...svgProps} />,
        text: "七级标题",
        tooltip: "Ctrl + Alt + 7",
      },
      {
        icon: <H8Outlined {...svgProps} />,
        text: "八级标题",
        tooltip: "Ctrl + Alt + 8",
      },
      {
        icon: <H9Outlined {...svgProps} />,
        text: "九级标题",
        tooltip: "Ctrl + Alt + 9",
      },
    ];
  }, []);

  return <Menu items={menus} />;
};

export default TitleMenu;
