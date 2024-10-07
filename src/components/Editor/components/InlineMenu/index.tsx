import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import {
  CalloutOutlined,
  DisorderListOutlined,
  H1Outlined,
  H2Outlined,
  H3Outlined,
  HnOutlined,
  OrderListOutlined,
  ReferenceOutlined,
  TextOutlined,
} from "../Icon";
import { svgProps } from "../../utils/getSideAnimateClassName";
import TitleMenu from "./TitleMenu";
import { useTextBlock } from "../../plugin/text-block/useTextBlock";
import { useHeading } from "../../plugin/heading/useHeading";
import { useQuoteBlock } from "../../plugin/quote-block/useQuoteBlock";
import { useHighlightBlock } from "../../plugin/highlight-block/useHighlightBlock";
import { defaultColorSetting } from "../ColorPicker";

const InlineMenu: React.FC = () => {
  const { textBlock, commandTextBlock } = useTextBlock();
  const { heading, commandHeading } = useHeading();
  const { quoteBlock, commandQuoteBlock } = useQuoteBlock();
  const { highlightBlock, commandHighlightBlock } = useHighlightBlock();

  const menus = useMemo<Item[]>(() => {
    return [
      {
        icon: <TextOutlined {...svgProps} />,
        text: "正文",
        tooltip: "Ctrl + Alt + 0",
        active: textBlock?.isActive,
        onClick() {
          commandTextBlock();
        },
      },
      {
        icon: <H1Outlined {...svgProps} />,
        text: "一级标题",
        tooltip: "Ctrl + Alt + 1",
        active: heading?.heading === "h1",
        onClick() {
          commandHeading("h1");
        },
      },
      {
        icon: <H2Outlined {...svgProps} />,
        text: "二级标题",
        tooltip: "Ctrl + Alt + 2",
        active: heading?.heading === "h2",
        onClick() {
          commandHeading("h2");
        },
      },
      {
        icon: <H3Outlined {...svgProps} />,
        text: "三级标题",
        tooltip: "Ctrl + Alt + 3",
        active: heading?.heading === "h3",
        onClick() {
          commandHeading("h3");
        },
      },
      {
        icon: <HnOutlined {...svgProps} />,
        text: "其他标题",
        submenu: <TitleMenu />,
        submenuPopoverProps: {
          renderToBody: false,
        },
      },
      {
        icon: <OrderListOutlined {...svgProps} />,
        text: "有序列表",
        tooltip: "Ctrl + Shift + 7",
      },
      {
        icon: <DisorderListOutlined {...svgProps} />,
        text: "无序列表",
        tooltip: "Ctrl + Shift + 8",
        devider: true,
      },
      {
        icon: <ReferenceOutlined {...svgProps} />,
        text: "引用",
        tooltip: "Ctrl + Shift + >",
        active: quoteBlock?.isActive,
        onClick() {
          commandQuoteBlock();
        },
      },
      {
        icon: <CalloutOutlined {...svgProps} />,
        text: "高亮块",
        tooltip: "高亮块",
        hidden: highlightBlock?.isActive,
        onClick() {
          commandHighlightBlock({
            highlightBlock: defaultColorSetting,
          });
        },
      },
    ];
  }, [textBlock, heading, quoteBlock]);

  return <Menu items={menus} />;
};

export default InlineMenu;
