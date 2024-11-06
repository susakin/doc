import React, { useMemo } from "react";
import styles from "./index.module.less";
import { svgProps } from "../../utils";
import {
  DragOutlined,
  AddOutlined,
  DividerOutlined,
  CalloutOutlined,
  H1Outlined,
  H2Outlined,
  H3Outlined,
  H5Outlined,
  H6Outlined,
  H7Outlined,
  H8Outlined,
  H9Outlined,
  H4Outlined,
  TextOutlined,
  TodoOutlined,
} from "../Icon";
import BlockMenu from "../BlockMenu";
import Popover, { PopoverProps } from "../Tooltip/Popover";
import { ReactEditor, RenderElementProps } from "slate-react";
import EmptyBlockMenu from "../EmptyBlockMenu";
import { DIVIDER_BLOCK_KEY } from "../../plugin/divider-block";
import { HIGHLIGHT_BLOCK_KEY } from "../../plugin/highlight-block";
import { HEADING_KEY } from "../../plugin/heading";
import { TEXT_BLOCK_KEY } from "../../plugin/text-block";
import { TODO_BLCOK_KEY } from "../../plugin/todo-block";
import { pluginController } from "../../plugin/base/controller";
import { isEmptyElement as isElementEmpty } from "../../utils/slateHelper";

const classNamePrefix = "menu-trigger";

type MenuTriggerProps = Pick<PopoverProps, "onOpenChange"> & {
  activeElement?: RenderElementProps["element"];
};

const isTextBlock = (element: RenderElementProps["element"]) => {
  const editor = pluginController.editor as any;
  const path = ReactEditor.findPath(editor as any, element as any);
  const isEmpty = isElementEmpty(editor, path);
  if (element?.[TEXT_BLOCK_KEY] === undefined || isEmpty) return false;
  return true;
};

export const isEmptyElement = (element: RenderElementProps["element"]) => {
  return !(
    isTextBlock(element as any) ||
    !!element?.[DIVIDER_BLOCK_KEY] ||
    !!element?.[HIGHLIGHT_BLOCK_KEY] ||
    !!element?.[HEADING_KEY] ||
    !!element?.[TODO_BLCOK_KEY]
  );
};

const headingIconMap: Record<string, React.ReactElement> = {
  h1: <H1Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h2: <H2Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h3: <H3Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h4: <H4Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h5: <H5Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h6: <H6Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h7: <H7Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h8: <H8Outlined {...svgProps} style={{ color: "#336df4" }} />,
  h9: <H9Outlined {...svgProps} style={{ color: "#336df4" }} />,
};

const MenuTrigger: React.FC<MenuTriggerProps> = ({
  onOpenChange,
  activeElement,
}) => {
  const isDivider = !!activeElement?.[DIVIDER_BLOCK_KEY];

  const icon = useMemo(() => {
    if (activeElement?.[HIGHLIGHT_BLOCK_KEY]) {
      return <CalloutOutlined {...svgProps} style={{ color: "#ff811a" }} />;
    }
    if (isTextBlock(activeElement as any)) {
      return <TextOutlined {...svgProps} style={{ color: "#336df4" }} />;
    }
    if (activeElement?.[TODO_BLCOK_KEY]) {
      return <TodoOutlined {...svgProps} style={{ color: "#5b65f5" }} />;
    }
    if (activeElement?.[DIVIDER_BLOCK_KEY]) {
      return <DividerOutlined />;
    }

    const heading = activeElement?.[HEADING_KEY];
    if (heading) {
      return headingIconMap[heading];
    }
    return <AddOutlined {...svgProps} />;
  }, [activeElement]);
  const isEmpty = isEmptyElement(activeElement as any);
  return (
    <Popover
      content={
        isEmpty ? <EmptyBlockMenu /> : <BlockMenu isDivider={isDivider} />
      }
      placement="left"
      offset={5}
      renderToBody={false}
      hideWhenContentClick
      onOpenChange={onOpenChange}
    >
      <div className={styles[`${classNamePrefix}`]}>
        <div className={styles[`${classNamePrefix}-icon`]}>{icon}</div>
        {!isEmpty && (
          <div className={styles[`${classNamePrefix}-drag`]}>
            <DragOutlined {...svgProps} />
          </div>
        )}
      </div>
    </Popover>
  );
};

export default MenuTrigger;
