import React from "react";
import Popover, { PopoverProps } from "./Popover";
import styles from "./index.module.less";
import cs from "classnames";
import { FloatingArrow, Side } from "@floating-ui/react";

type TooltipProps = {
  children?: React.ReactElement;
  content?: React.ReactNode;
  size?: "default" | "small";
  hasArrow?: boolean;
} & Pick<PopoverProps, "placement" | "offset" | "renderToBody">;

const className = "tooltip";

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  hasArrow = true,
  size = "default",
  placement = "top",
  ...rest
}) => {
  return (
    <Popover
      placement={placement}
      offset={8}
      hasSafePolygon={false}
      {...rest}
      content={({ side: placement, arrowRef, context }) => {
        const [side] = placement.split("-") as [Side];
        const origin = {
          right: "left",
          left: "right",
          top: "bottom",
          bottom: "top",
        };
        return (
          <div
            className={styles[`zoom-in`]}
            style={{
              transformOrigin: `${origin[side]} center`,
            }}
          >
            <div
              className={cs(
                styles[`${className}`],
                styles[`${className}-${size}`]
              )}
            >
              {content}
            </div>

            {hasArrow && (
              <FloatingArrow
                style={{ transform: `rotate(180deg)` }}
                fill="#1f2329"
                height={8}
                width={16}
                d="M4.438 1.993L7.253 5.16a1 1 0 001.494 0l2.815-3.166A5.938 5.938 0 0116 0H0c1.696 0 3.311.725 4.438 1.993z"
                viewBox="0 0 16 8"
                ref={arrowRef}
                context={context}
              />
            )}
          </div>
        );
      }}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
