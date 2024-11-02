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
import { svgProps } from "../../utils";
import { useHeading } from "../../plugin/heading/useHeading";

const TitleMenu: React.FC = () => {
  const { heading, commandHeading } = useHeading();

  const menus = useMemo<Item[]>(() => {
    return [
      {
        icon: <H4Outlined {...svgProps} />,
        text: "四级标题",
        tooltip: "Ctrl + Alt + 4",
        active: heading?.heading === "h4",
        onClick() {
          commandHeading({ heading: "h4" });
        },
      },
      {
        icon: <H5Outlined {...svgProps} />,
        text: "五级标题",
        tooltip: "Ctrl + Alt + 5",
        active: heading?.heading === "h5",
        onClick() {
          commandHeading({ heading: "h5" });
        },
      },
      {
        icon: <H6Outlined {...svgProps} />,
        text: "六级标题",
        tooltip: "Ctrl + Alt + 6",
        active: heading?.heading === "h6",
        onClick() {
          commandHeading({ heading: "h6" });
        },
      },
      {
        icon: <H7Outlined {...svgProps} />,
        text: "七级标题",
        tooltip: "Ctrl + Alt + 7",
        active: heading?.heading === "h7",
        onClick() {
          commandHeading({ heading: "h7" });
        },
      },
      {
        icon: <H8Outlined {...svgProps} />,
        text: "八级标题",
        tooltip: "Ctrl + Alt + 8",
        active: heading?.heading === "h8",
        onClick() {
          commandHeading({ heading: "h8" });
        },
      },
      {
        icon: <H9Outlined {...svgProps} />,
        text: "九级标题",
        tooltip: "Ctrl + Alt + 9",
        active: heading?.heading === "h9",
        onClick() {
          commandHeading({ heading: "h9" });
        },
      },
    ];
  }, [heading]);

  return <Menu items={menus} />;
};

export default TitleMenu;
