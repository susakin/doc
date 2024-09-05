import React from "react";
import styles from "./index.module.less";
import { LeafContext } from "../../plugin/base";

const classNamePrefix = "leaf";

type LeafProps = {
  children?: React.ReactNode;
} & LeafContext;

const Leaf: React.FC<LeafProps> = ({ children, style, ...rest }) => {
  return (
    <span
      style={style}
      className={styles[`${classNamePrefix}`]}
      {...rest.props.attributes}
    >
      {children}
    </span>
  );
};

export default Leaf;
