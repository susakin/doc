import React from "react";
import styles from "./blockPlaceholder.module.less";
import { RenderElementProps, useSlate } from "slate-react";
import cs from "classnames";
import { ALIGN_KEY } from "../../plugin/align";
import { isElementFocused, isEmptyText } from ".";
import { useEditorIsfoucesed } from "../../hooks/useEditorIsFocused";

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
  const isEleFocused = isElementFocused(baseEdior, element);
  const isEmpty = isEmptyText(element as any);
  const { isFocused } = useEditorIsfoucesed();

  const hasPlaceholder = element?.holdingPlaceholder
    ? isEmpty
    : isEmpty && isEleFocused && isFocused;

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
