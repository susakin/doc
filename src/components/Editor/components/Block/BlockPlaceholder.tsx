import React, { useEffect, useState } from "react";
import styles from "./blockPlaceholder.module.less";
import { RenderElementProps, useSlate } from "slate-react";
import cs from "classnames";
import { ALIGN_KEY } from "../../plugin/align";
import { isElementFocused, isEmptyText } from ".";
import { pluginController } from "../../plugin/base/controller";
import { EDITOR_EVENT } from "../../event/action";

const classNamePrefix = "block-placeholder";

type BlockPlaceholderProps = {
  children: React.ReactNode;
  element: RenderElementProps["element"];
};

const BlockPlaceholder: React.FC<BlockPlaceholderProps> = ({
  children,
  element,
}) => {
  const baseEdior = useSlate();
  const isFocused = isElementFocused(baseEdior, element);
  const isEmpty = isEmptyText(element as any);
  const [isBlured, setIsBlured] = useState<boolean>(false);

  const hasPlaceholder = element?.holdingPlaceholder
    ? isEmpty
    : isEmpty && isFocused && !isBlured;

  useEffect(() => {
    const onBlur = () => {
      setIsBlured(true);
    };
    const onFocus = () => {
      setIsBlured(false);
    };

    pluginController.event.on(EDITOR_EVENT.BLUR, onBlur);
    pluginController.event.on(EDITOR_EVENT.FOCUS, onFocus);

    return () => {
      pluginController.event.off(EDITOR_EVENT.BLUR, onBlur);
      pluginController.event.off(EDITOR_EVENT.FOCUS, onFocus);
    };
  }, []);

  return (
    <div
      className={cs(
        styles[`${classNamePrefix}`],
        styles[
          `${classNamePrefix}-${
            ["left", undefined].includes(element?.[ALIGN_KEY]) && hasPlaceholder
              ? "has-placeholder"
              : ""
          }`
        ]
      )}
      data-placeholder={hasPlaceholder ? element?.placeholder : undefined}
    >
      {children}
    </div>
  );
};

export default BlockPlaceholder;
