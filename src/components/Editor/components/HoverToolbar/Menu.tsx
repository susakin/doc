import React, { useMemo } from "react";
import { GlobalLinkOutlined, ItalicOutlined, UnderlineOutlined } from "../Icon";
import { svgProps } from "@/utils";
import { BoldOutlined, HorizontalLineOutlined } from "../Icon";
import { useColorPicker } from "./useColorPicker";
import { useTypography } from "./useTypography";
import { useInlineMenu } from "./useInlineMenu";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import { useBold } from "../../plugin/bold/useBold";
import { useItalic } from "../../plugin/italic/useItalic";

type MenuProps = {};

const Menu: React.FC<MenuProps> = () => {
  const colorPicker = useColorPicker();
  const typography = useTypography();
  const inlineMenu = useInlineMenu();

  const { bold, commandBold } = useBold();
  const { italic, commandItalic } = useItalic();

  const items = useMemo<(Item | undefined)[]>(() => {
    return [
      inlineMenu,
      typography,
      {
        icon: <BoldOutlined {...svgProps} />,
        tooltip: "粗体 (Ctrl + B)",
        active: !!bold?.isActive,
        onClick() {
          commandBold();
        },
      },
      {
        icon: <HorizontalLineOutlined {...svgProps} />,
        tooltip: "粗体 (Ctrl + Sfhit + X)",
      },
      {
        icon: <ItalicOutlined {...svgProps} />,
        tooltip: "斜体 (Ctrl + I)",
        active: !!italic.isActive,
        onClick() {
          commandItalic();
        },
      },
      {
        icon: <UnderlineOutlined {...svgProps} />,
        tooltip: "下划线 (Ctrl + U)",
      },
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        tooltip: "链接 (Ctrl + K)",
      },
      colorPicker,
    ];
  }, [colorPicker, typography, bold, italic]);

  return <HorizontalMenu items={items} />;
};

export default Menu;
