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
  TodoOutlined,
} from "../Icon";
import { svgProps } from "../../utils";
import TitleMenu from "./TitleMenu";
import { useTextBlock } from "../../plugin/text-block/useTextBlock";
import { useHeading } from "../../plugin/heading/useHeading";
import { useQuoteBlock } from "../../plugin/quote-block/useQuoteBlock";
import { useHighlightBlock } from "../../plugin/highlight-block/useHighlightBlock";
import { defaultColorSetting } from "../ColorPicker";
import { useTodoBlock } from "../../plugin/todo-block/useTodoBlock";

const InlineMenu: React.FC = () => {
  const { textBlock, commandTextBlock } = useTextBlock();
  const { heading, commandHeading } = useHeading();
  const { quoteBlock, commandQuoteBlock } = useQuoteBlock();
  const { highlightBlock, commandHighlightBlock } = useHighlightBlock();
  const { todoBlock, commandTodoBlock } = useTodoBlock();

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
          commandHeading({ heading: "h1" });
        },
      },
      {
        icon: <H2Outlined {...svgProps} />,
        text: "二级标题",
        tooltip: "Ctrl + Alt + 2",
        active: heading?.heading === "h2",
        onClick() {
          commandHeading({ heading: "h2" });
        },
      },
      {
        icon: <H3Outlined {...svgProps} />,
        text: "三级标题",
        tooltip: "Ctrl + Alt + 3",
        active: heading?.heading === "h3",
        onClick() {
          commandHeading({ heading: "h3" });
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
      },
      {
        icon: <TodoOutlined {...svgProps} />,
        text: "任务",
        tooltip: "Ctrl + Alt + T",
        active: todoBlock?.isActive,
        onClick() {
          commandTodoBlock();
        },
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
  }, [textBlock, heading, quoteBlock, todoBlock]);

  return <Menu items={menus} />;
};

export default InlineMenu;
