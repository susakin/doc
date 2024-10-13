import React, { useRef } from "react";
import styles from "./index.module.less";
import { BlockContext } from "../../plugin/base";
import mergeRefs from "merge-refs";
import { pluginController } from "../../plugin/base/controller";
import { EDITOR_EVENT } from "../../event/action";

const classNamePrefix = "block";

type BlockProps = {
  children?: React.ReactNode;
} & BlockContext;

const Block: React.FC<BlockProps> = ({ children, style, ...rest }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  return (
    <div
      style={style}
      className={styles[`${classNamePrefix}`]}
      {...rest.props.attributes}
      onMouseEnter={() => {
        pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, {
          element: rest.element,
          domElement: elementRef.current as any,
        });
      }}
      ref={mergeRefs(elementRef, rest.props.attributes?.ref)}
    >
      {children}
    </div>
  );
};

export default Block;
