import React from "react";
import Popover, { PopoverProps } from "./Popover";
import styles from "./index.module.less";
import { Arrow } from "../Icon";
import cs from "classnames";

type TooltipProps = {
  children?: React.ReactElement;
  content?: React.ReactNode;
  size?: "default" | "small";
} & Pick<PopoverProps, "placement" | "hasArrow">;

const className = "tooltip";

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  hasArrow = true,
  size = "default",
  placement = "top",
}) => {
  return (
    <Popover
      placement={placement}
      offset={8}
      className={styles[`zoom-in`]}
      hasArrow={hasArrow}
      content={
        <div
          className={cs(styles[`${className}`], styles[`${className}-${size}`])}
        >
          {content}
        </div>
      }
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
