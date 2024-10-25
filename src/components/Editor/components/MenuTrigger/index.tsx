import React, { useMemo } from "react";
import styles from "./index.module.less";
import { svgProps } from "../../utils/getSideAnimateClassName";
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
} from "../Icon";
import BlockMenu from "../BlockMenu";
import Popover, { PopoverProps } from "../Tooltip/Popover";
import { RenderElementProps } from "slate-react";
import EmptyBlockMenu from "../EmptyBlockMenu";
import { DIVIDER_BLOCK_KEY } from "../../plugin/divider-block";
import { HIGHLIGHT_BLOCK_KEY } from "../../plugin/highlight-block";
import { HEADING_KEY } from "../../plugin/heading";

const classNamePrefix = "menu-trigger";

type MenuTriggerProps = Pick<PopoverProps, "onOpenChange"> & {
  activeElement?: RenderElementProps["element"];
};

export const isEmpeyElement = (element: RenderElementProps["element"]) => {
  if (!element) return false;
  const keys = Object.keys(element)?.filter(
    (key) => (element as any)[key] !== undefined
  );
  return keys.length === 1 && (element?.children[0] as any)?.text?.length === 0;
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
  const isEmpty = isEmpeyElement(activeElement as any);
  const isDivider = !!activeElement?.[DIVIDER_BLOCK_KEY];

  const icon = useMemo(() => {
    if (isEmpty) {
      return <AddOutlined {...svgProps} />;
    }
    if (activeElement?.[DIVIDER_BLOCK_KEY]) {
      return <DividerOutlined {...svgProps} style={{ color: "#ff811a" }} />;
    }
    if (activeElement?.[HIGHLIGHT_BLOCK_KEY]) {
      return <CalloutOutlined {...svgProps} style={{ color: "#ff811a" }} />;
    }
    const heading = activeElement?.[HEADING_KEY];
    if (heading) {
      return headingIconMap[heading];
    }
    return <TextOutlined {...svgProps} style={{ color: "#336df4" }} />;
  }, [isEmpty, activeElement]);

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
