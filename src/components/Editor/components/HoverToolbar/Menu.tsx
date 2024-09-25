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
import { useUnderLine } from "../../plugin/under-line/useUnderLine";
import { useLineThrough } from "../../plugin/line-through/useLineThrough";

type MenuProps = {};

const Menu: React.FC<MenuProps> = () => {
  const colorPicker = useColorPicker();
  const typography = useTypography();
  const inlineMenu = useInlineMenu();

  const { bold, commandBold } = useBold();
  const { italic, commandItalic } = useItalic();
  const { underLine, commandUnderLine } = useUnderLine();
  const { lineThrough, commandLineThrough } = useLineThrough();

  console.log(lineThrough, "lineThrough");

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
        tooltip: "删除线 (Ctrl + Sfhit + X)",
        active: !!lineThrough?.isActive,
        onClick() {
          commandLineThrough();
        },
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
        active: !!underLine.isActive,
        onClick() {
          commandUnderLine();
        },
      },
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        tooltip: "链接 (Ctrl + K)",
      },
      colorPicker,
    ];
  }, [colorPicker, typography, bold, italic, underLine, lineThrough]);

  return <HorizontalMenu items={items} />;
};

export default Menu;
