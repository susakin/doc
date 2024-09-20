import React from "react";
import styles from "./index.module.less";

const classNamePrefix = "selected-mask";

const SelectedMask: React.FC = () => {
  return <div className={styles[`${classNamePrefix}`]} />;
};

export default SelectedMask;
