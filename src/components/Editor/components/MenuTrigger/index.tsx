import React, { useMemo } from "react";
import styles from "./index.module.less";
import { svgProps } from "../../utils/getSideAnimateClassName";
import { DragOutlined, AddOutlined } from "../Icon";
import BlockMenu from "../BlockMenu";
import Popover, { PopoverProps } from "../Tooltip/Popover";
import { RenderElementProps } from "slate-react";
import EmptyBlockMenu from "../EmptyBlockMenu";
import { Editor } from "slate";
import { pluginController } from "../../plugin/base/controller";

const classNamePrefix = "menu-trigger";

type MenuTriggerProps = Pick<PopoverProps, "onOpenChange"> & {
  activeElement?: RenderElementProps["element"];
};

export const isEmpeyElement = (element: RenderElementProps["element"]) => {
  return (
    Object.keys(element).length === 1 &&
    (element?.children[0] as any)?.text?.length === 0
  );
};

const MenuTrigger: React.FC<MenuTriggerProps> = ({
  onOpenChange,
  activeElement,
}) => {
  const isEmpty = isEmpeyElement(activeElement as any);

  const icon = useMemo(() => {
    if (isEmpty) {
      return <AddOutlined {...svgProps} />;
    }
  }, [isEmpty]);

  return (
    <Popover
      content={isEmpty ? <EmptyBlockMenu /> : <BlockMenu />}
      placement="left"
      offset={5}
      renderToBody={false}
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
