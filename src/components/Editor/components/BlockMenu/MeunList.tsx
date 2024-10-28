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
  TodoOutlined,
} from "../Icon";
import { Item } from "../HorizontalMenu";
import FlattenMenu from "./FlattenMenu";
import { svgProps } from "../../utils/getSideAnimateClassName";
import { useTextBlock } from "../../plugin/text-block/useTextBlock";
import { useHeading } from "../../plugin/heading/useHeading";
import { useHighlightBlock } from "../../plugin/highlight-block/useHighlightBlock";
import { defaultColorSetting } from "../ColorPicker";
import { useQuoteBlock } from "../../plugin/quote-block/useQuoteBlock";
import { textBlockPlugin } from "../../plugin/text-block";
import { isEmptyElement } from "../MenuTrigger";
import { useDividerBlock } from "../../plugin/divider-block/useDividerBlock";
import { pluginController } from "../../plugin/base/controller";
import { useTodoBlock } from "../../plugin/todo-block/useTodoBlock";
import { EDITOR_EVENT } from "../../event/action";

type MenuListProps = {};

const MenuList: React.FC<MenuListProps> = ({}) => {
  const { textBlock, commandTextBlock } = useTextBlock();
  const { heading, commandHeading } = useHeading();
  const { highlightBlock, commandHighlightBlock } = useHighlightBlock();
  const { quoteBlock, commandQuoteBlock } = useQuoteBlock();
  const { todoBlock, commandTodoBlock } = useTodoBlock();
  const isEmpty = isEmptyElement(textBlockPlugin.selectedElement as any);
  const { commandDividerBlock } = useDividerBlock();

  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <TextOutlined {...svgProps} />,
        tooltip: "正文(Ctrl + Alt + 0)",
        active: textBlock.isActive,
        onClick() {
          commandTextBlock();
        },
        hidden: isEmpty,
      },
      {
        icon: <H1Outlined {...svgProps} />,
        tooltip: "一级标题(Ctrl + Alt + 1)",
        active: heading?.heading === "h1",
        onClick() {
          commandHeading({ heading: "h1" });
        },
      },
      {
        icon: <H2Outlined {...svgProps} />,
        tooltip: "二级标题(Ctrl + Alt + 2)",
        active: heading?.heading === "h2",
        onClick() {
          commandHeading({ heading: "h2" });
        },
      },
      {
        icon: <H3Outlined {...svgProps} />,
        tooltip: "三级标题(Ctrl + Alt + 3)",
        active: heading?.heading === "h3",
        onClick() {
          commandHeading({ heading: "h3" });
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
        icon: <TodoOutlined {...svgProps} />,
        tooltip: "任务列表(Ctrl + Alt + T)",
        active: todoBlock.isActive,
        onClick() {
          commandTodoBlock();
        },
      },
      {
        icon: <ReferenceOutlined {...svgProps} />,
        tooltip: "引用(Ctrl + Shift + >)",
        active: quoteBlock.isActive,
        onClick() {
          commandQuoteBlock();
        },
      },
      {
        icon: <CalloutOutlined {...svgProps} />,
        tooltip: "高亮块",
        active: highlightBlock.isActive,
        onClick() {
          commandHighlightBlock({
            highlightBlock: highlightBlock.isActive
              ? undefined
              : defaultColorSetting,
          });
        },
      },
      {
        icon: <DividerOutlined {...svgProps} />,
        tooltip: "分割线(Ctrl + Alt + S)",
        hidden: !isEmpty,
        onClick() {
          commandDividerBlock();
        },
      },
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        tooltip: "链接 (Ctrl + K)",
        hidden: !isEmpty,
        onClick() {
          pluginController.event.trigger(
            EDITOR_EVENT.ADD_LINK,
            pluginController.getSelectedElementPath()
          );
        },
      },
    ];
  }, [
    textBlock,
    highlightBlock,
    heading?.heading,
    quoteBlock,
    isEmpty,
    todoBlock,
  ]);
  return <FlattenMenu items={items} />;
};

export default MenuList;
