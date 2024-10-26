import React from "react";
import styles from "./flattenMenu.module.less";
import { getRenderItem } from "../HorizontalMenu/MenuItem";
import { Item } from "../HorizontalMenu";

const classNamePrefix = "flatten-menu";

type FlattenMenuProps = {
  items?: Item[];
};

const FlattenMenu: React.FC<FlattenMenuProps> = ({ items }) => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      {items?.map((item, index) => {
        if (!item || item.hidden) return null;
        const renderItem = getRenderItem(item);
        return (
          <div className={styles[`${classNamePrefix}-item`]} key={index}>
            {renderItem}
          </div>
        );
      })}
    </div>
  );
};

export default FlattenMenu;
