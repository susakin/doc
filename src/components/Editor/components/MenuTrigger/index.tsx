import React from "react";
import styles from "./index.module.less";
import { svgProps } from "../../utils/getSideAnimateClassName";
import { DragOutlined } from "../Icon";
import BlockMenu from "../BlockMenu";
import Popover from "../Tooltip/Popover";

const classNamePrefix = "menu-trigger";

const MenuTrigger: React.FC = () => {
  return (
    <Popover content={<BlockMenu />} placement="left" offset={5}>
      <div className={styles[`${classNamePrefix}`]}>
        <div className={styles[`${classNamePrefix}-icon`]}></div>
        <div className={styles[`${classNamePrefix}-drag`]}>
          <DragOutlined {...svgProps} />
        </div>
      </div>
    </Popover>
  );
};

export default MenuTrigger;
