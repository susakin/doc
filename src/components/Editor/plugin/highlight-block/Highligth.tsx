import React from "react";
import styles from "./highlight.module.less";
import Popover from "@/components/Editor/components/Tooltip/Popover";
import { getSideAnimateClassName } from "@/utils";
import HighlightMenu, {
  HighlightMenuProps,
} from "@/components/Editor/components/HighlightMenu";

const classNamePrefix = "highlight";

type HighlightProps = {
  children?: React.ReactNode;
  readonly?: boolean;
} & HighlightMenuProps;

const Highlight: React.FC<HighlightProps> = ({
  children,
  value,
  onChange,
  readonly,
}) => {
  return (
    <Popover
      placement={"top"}
      enabled={!readonly}
      offset={10}
      hasMaxHeight
      content={({ side, maxHeight }) => {
        if (readonly) return null;
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
