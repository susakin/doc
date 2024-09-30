import React from "react";
import styles from "./index.module.less";
import { svgProps } from "../../utils/getSideAnimateClassName";
import { DragOutlined } from "../Icon";

const classNamePrefix = "menu-trigger";

const MenuTrigger: React.FC = () => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      <div className={styles[`${classNamePrefix}-icon`]}></div>
      <div className={styles[`${classNamePrefix}-drag`]}>
        <DragOutlined {...svgProps} />
      </div>
    </div>
  );
};

export default MenuTrigger;
