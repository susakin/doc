import React, { useMemo } from "react";
import {
  CalloutOutlined,
  DisorderListOutlined,
  DividerOutlined,
  GlobalLinkOutlined,
  H1Outlined,
  H2Outlined,
  H3Outlined,
  OrderListOutlined,
  ReferenceOutlined,
  TextOutlined,
} from "../Icon";
import { Item } from "../HorizontalMenu";
import { svgProps } from "../../utils/getSideAnimateClassName";
import { useTextBlock } from "../../plugin/text-block/useTextBlock";
import { useHeading } from "../../plugin/heading/useHeading";
import { useHighlightBlock } from "../../plugin/highlight-block/useHighlightBlock";
import { useQuoteBlock } from "../../plugin/quote-block/useQuoteBlock";
import { useDividerBlock } from "../../plugin/divider-block/useDividerBlock";
import FlattenMenu from "../BlockMenu/FlattenMenu";

type MenuListProps = {};

const MenuList: React.FC<MenuListProps> = ({}) => {
  const { insertNodeAfterSelectedElement: insertText } = useTextBlock();
  const { insertNodeAfterSelectedElement: insertHeading } = useHeading();
  const { insertNodeAfterSelectedElement: insertHighlight } =
    useHighlightBlock();
  const { insertNodeAfterSelectedElement: insertQuote } = useQuoteBlock();
  const { insertNodeAfterSelectedElement: insertDivider } = useDividerBlock();

  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <TextOutlined {...svgProps} />,
        tooltip: "正文(Ctrl + Alt + 0)",
        onClick() {
          insertText();
        },
      },
      {
        icon: <H1Outlined {...svgProps} />,
        tooltip: "一级标题(Ctrl + Alt + 1)",
        onClick() {
          insertHeading("h1");
        },
      },
      {
        icon: <H2Outlined {...svgProps} />,
        tooltip: "二级标题(Ctrl + Alt + 2)",
        onClick() {
          insertHeading("h2");
        },
      },
      {
        icon: <H3Outlined {...svgProps} />,
        tooltip: "三级标题(Ctrl + Alt + 3)",
        onClick() {
          insertHeading("h3");
        },
      },
      {
        icon: <OrderListOutlined {...svgProps} />,
        tooltip: "有序列表(Ctrl + Shift + 7)",
      },
      {
        icon: <DisorderListOutlined {...svgProps} />,
        tooltip: "无序列表(Ctrl + Shift + 8)",
      },
      {
        icon: <ReferenceOutlined {...svgProps} />,
        tooltip: "引用(Ctrl + Shift + >)",
        onClick() {
          insertQuote();
        },
      },
      {
        icon: <CalloutOutlined {...svgProps} />,
        tooltip: "高亮块",
        onClick() {
          insertHighlight();
        },
      },
      {
        icon: <DividerOutlined {...svgProps} />,
        tooltip: "分割线(Ctrl + Alt + S)",
        onClick() {
          insertDivider();
        },
      },
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        tooltip: "链接 (Ctrl + K)",
      },
    ];
  }, []);

  return <FlattenMenu items={items} />;
};

export default MenuList;
