import React from "react";
import styles from "./index.module.less";
import { getRenderItem } from "./MenuItem";
import { PopoverProps } from "../Tooltip/Popover";

const classNamePrefix = "menu";

export type Item = {
  key?: string;
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
  danger?: boolean;
  hidden?: boolean;
  submenuPopoverProps?: Pick<
    PopoverProps,
    "placement" | "renderToBody" | "hideWhenContentClick"
  >;
};

type MenuProps = {
  items?: (Item | undefined)[];
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Item
  ) => void;
};

const Menu: React.FC<MenuProps> = ({ items, onClick }) => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      <div className={styles[`${classNamePrefix}-inner`]}>
        {items
          ?.filter((item) => !!item)
          ?.map((item, index) => {
            const { devider, submenuPopoverProps } = item;
            if (item.hidden) return null;
            const _onClick = item.onClick;
            item.onClick = (e) => {
              if (submenuPopoverProps?.hideWhenContentClick) {
                e.stopPropagation();
              }
              _onClick?.(e);
              onClick?.(e, item);
            };
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
