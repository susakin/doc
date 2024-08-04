import React from "react";
import styles from "./index.module.less";
import { getRenderItem } from "./MenuItem";

const classNamePrefix = "menu";

export type Item = {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  tooltip?: React.ReactNode;
  render?: () => React.ReactNode;
  active?: boolean;
  submenu?: React.ReactNode;
  devider?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

type MenuProps = {
  items?: Item[];
};

const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      <div className={styles[`${classNamePrefix}-inner`]}>
        {items?.map((item, index) => {
          const { devider } = item;
          const renderItem = getRenderItem(item);
          return (
            <>
              {renderItem}
              {devider && (
                <div
                  className={styles[`${classNamePrefix}-inner-devider`]}
                  key={index}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
