import React from "react";
import styles from "./highlight.module.less";
import Popover from "@/components/Editor/components/Tooltip/Popover";
import HighlightMenu, {
  HighlightMenuProps,
} from "@/components/Editor/components/HighlightMenu";
import AnimationWrapper from "../../components/Tooltip/AnimationWrapper";

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
      content={({ side }) => {
        if (readonly) return null;
        return (
          <AnimationWrapper side={side}>
            <HighlightMenu value={value} onChange={onChange} />
          </AnimationWrapper>
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
