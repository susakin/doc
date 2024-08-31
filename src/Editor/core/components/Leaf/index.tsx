import React from "react";
import styles from "./index.module.less";

const classNamePrefix = "leaf";

type LeafProps = {
  children?: React.ReactNode;
  [x: string]: any;
};

const Leaf: React.FC<LeafProps> = ({ children, ...rest }) => {
  return (
    <div {...rest} className={styles[`${classNamePrefix}`]}>
      {children}
    </div>
  );
};

export default Leaf;
