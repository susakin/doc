import React from "react";
import styles from "./index.module.less";

import { getRenderItem } from "./MenuItem";

export type Item = {
  icon?: React.ReactNode;
  submenu?: React.ReactNode;
  devider?: boolean;
  unique?: boolean;
  tooltip?: React.ReactNode;
  active?: boolean;
};

type ToolbarProps = {
  items?: (Item | undefined)[];
};

const classNamePrefix = "horizontal-menu";

const HorizontalMenu: React.FC<ToolbarProps> = ({ items }) => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      {items
        ?.filter((item) => !!item)
        .map((item) => {
          const renderItem = getRenderItem(item);
          return (
            <>
              {renderItem}
              {item?.devider && (
                <div className={styles[`${classNamePrefix}-devider`]} />
              )}
            </>
          );
        })}
    </div>
  );
};

export default HorizontalMenu;
