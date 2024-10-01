import React from "react";
import styles from "./index.module.less";

import { getRenderItem } from "./MenuItem";
import { PopoverProps } from "../Tooltip/Popover";

export type Item = {
  icon?: React.ReactNode;
  submenu?: React.ReactNode;
  devider?: boolean;
  unique?: boolean;
  tooltip?: React.ReactNode;
  active?: boolean;
  hasArrow?: boolean;
  render?: () => React.ReactNode;
  text?: React.ReactNode;
  key?: string;
  submenuPopoverProps?: Pick<
    PopoverProps,
    | "placement"
    | "renderToBody"
    | "hideWhenContentClick"
    | "openDelay"
    | "offset"
  >;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export type HorizontalMenuProps = {
  items?: (Item | undefined)[];
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: Item
  ) => void;
};

const classNamePrefix = "horizontal-menu";

const HorizontalMenu: React.FC<HorizontalMenuProps> = ({ items, onClick }) => {
  return (
    <div
      className={styles[`${classNamePrefix}`]}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {items
        ?.filter((item) => !!item)
        .map((item) => {
          const _onClick = item.onClick;
          item.onClick = (e) => {
            _onClick?.(e);
            onClick?.(e, item);
          };
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
