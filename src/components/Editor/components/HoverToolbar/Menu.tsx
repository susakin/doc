import React, { useMemo } from "react";
import {
  CodeOutlined,
  GlobalLinkOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "../Icon";
import { svgProps } from "../../utils";
import { BoldOutlined, HorizontalLineOutlined } from "../Icon";
import { useColorPicker } from "./useColorPicker";
import { useTypography } from "./useTypography";
import { useInlineMenu } from "./useInlineMenu";
import HorizontalMenu, { Item, HorizontalMenuProps } from "../HorizontalMenu";
import { useBold } from "../../plugin/bold/useBold";
import { useItalic } from "../../plugin/italic/useItalic";
import { useUnderLine } from "../../plugin/under-line/useUnderLine";
import { useLineThrough } from "../../plugin/line-through/useLineThrough";
import { HYPER_LINK_KEY } from "../../plugin/hyper-link";
import { useHyperLink } from "../../plugin/hyper-link/useHyperLink";
import { INLINE_CODE_KEY } from "../../plugin/inline-code";
import { useInlineCode } from "../../plugin/inline-code/useInlineCode";

type MenuProps = Pick<HorizontalMenuProps, "onClick">;

const Menu: React.FC<MenuProps> = ({ onClick }) => {
  const colorPicker = useColorPicker();
  const typography = useTypography();
  const inlineMenu = useInlineMenu();

  const { bold, commandBold } = useBold();
  const { italic, commandItalic } = useItalic();
  const { underLine, commandUnderLine } = useUnderLine();
  const { lineThrough, commandLineThrough } = useLineThrough();
  const { commandHyperLink, hyperLink } = useHyperLink();
  const { inlineCode, commandInlineCode } = useInlineCode();

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
        key: HYPER_LINK_KEY,
        active: hyperLink?.isActive,
        onClick() {
          commandHyperLink();
        },
      },
      {
        icon: <CodeOutlined {...svgProps} />,
        tooltip: "代码 (Ctrl + Shift + C)",
        key: INLINE_CODE_KEY,
        active: inlineCode?.isActive,
        onClick() {
          commandInlineCode();
        },
      },
      colorPicker,
    ];
  }, [
    colorPicker,
    typography,
    bold,
    italic,
    underLine,
    lineThrough,
    hyperLink,
    inlineMenu,
    inlineCode,
  ]);

  return <HorizontalMenu items={items} onClick={onClick} />;
};

export default Menu;
