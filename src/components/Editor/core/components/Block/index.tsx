import React from "react";
import styles from "./index.module.less";
import { BlockContext } from "../../plugin/base";

const classNamePrefix = "block";

type BlockProps = {
  children?: React.ReactNode;
} & BlockContext;

const Block: React.FC<BlockProps> = ({ children, style, ...rest }) => {
  return (
    <div
      style={style}
      className={styles[`${classNamePrefix}`]}
      {...rest.props.attributes}
    >
      {children}
    </div>
  );
};

export default Block;
