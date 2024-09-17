import React from "react";
import styles from "./highlight.module.less";
import Popover from "@/components/Tooltip/Popover";
import { getSideAnimateClassName } from "@/utils";
import HighlightMenu, { HighlightMenuProps } from "@/components/HighlightMenu";

const classNamePrefix = "highlight";

type HighlightProps = {
  children?: React.ReactNode;
} & HighlightMenuProps;

const Highlight: React.FC<HighlightProps> = ({ children, value, onChange }) => {
  return (
    <Popover
      placement={"top"}
      offset={10}
      hasMaxHeight
      content={({ side, maxHeight }) => {
        return (
          <div className={getSideAnimateClassName(side)} style={{ maxHeight }}>
            <HighlightMenu value={value} onChange={onChange} />
          </div>
        );
      }}
    >
      <div
        className={styles[`${classNamePrefix}`]}
        style={{ ...value, backgroundColor: value?.fillColor }}
      >
        {children}
      </div>
    </Popover>
  );
};

export default Highlight;
