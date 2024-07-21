import React from "react";
import Popover from "./Popover";
import styles from "./index.module.less";
import { Arrow } from "../Icon";
import cs from "classnames";

type TooltipProps = {
  children?: React.ReactElement;
  content?: React.ReactNode;
  hasArrow?: boolean;
  size?: "default" | "small";
};

const className = "tooltip";

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  hasArrow = true,
  size = "default",
}) => {
  return (
    <Popover
      placement="top"
      offset={8}
      className={styles[`zoom-in`]}
      arrow={
        hasArrow && (
          <Arrow viewBox="0 0 16 8" width={16} height={8} fill="#1f2329" />
        )
      }
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
