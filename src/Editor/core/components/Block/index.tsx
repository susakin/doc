import React from "react";
import styles from "./index.module.less";

const classNamePrefix = "block";

type BlockProps = {
  children?: React.ReactNode;
  [x: string]: any;
};

const Block: React.FC<BlockProps> = ({ children, ...rest }) => {
  return (
    <div {...rest} className={styles[`${classNamePrefix}`]}>
      {children}
    </div>
  );
};

export default Block;
