import React from "react";
import styles from "./menuItem.module.less";
import { Placement } from "@floating-ui/react";
import { getSideAnimateClassName } from "@/utils";
import cs from "classnames";
import Popover from "../Tooltip/Popover";
import { DownBoldOutlined } from "../Icon";
import Tooltip from "../Tooltip";
import { Item } from ".";

type MenuItemProps = {
  item: Omit<Item, "tooltip" | "devider">;
  open?: boolean;
  className?: string;
};

type MenuArrowProps = {
  open?: boolean;
};

const MenuArrow: React.FC<MenuArrowProps> = function ({ open }) {
  const classNamePrefix = "menu-arrow";
  return (
    <div
      className={cs(styles[`${classNamePrefix}`], {
        [styles[`${classNamePrefix}-hovered`]]: open,
      })}
    >
      <span className={styles[`${classNamePrefix}-icon`]}>
        <DownBoldOutlined viewBox="0 0 24 24" height="1em" width="1em" />
      </span>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ item, open, className }) => {
  const {
    unique,
    active,
    submenu,
    icon,
    placement = "bottom",
    hasArrow = true,
    render,
    text,
  } = item;
  const classNamePrefix = "menu-item";

  return (
    <>
      <div
        className={cs(styles[`${classNamePrefix}`], className, {
          [styles[`${classNamePrefix}-unique`]]: unique,
          [styles[`${classNamePrefix}-hovered`]]: open && !unique,
          [styles[`${classNamePrefix}-active`]]: active,
          [styles[`${classNamePrefix}-can-hover`]]: !submenu && !render,
        })}
      >
        {render?.()}
        {!!icon && (
          <div className={styles[`${classNamePrefix}-icon`]}>{icon}</div>
        )}
        {!!text && (
          <div className={styles[`${classNamePrefix}-text`]}>{text}</div>
        )}
        {!!submenu &&
          (unique ? (
            <Popover
              placement={placement}
              renderToBody={false}
              offset={10}
              content={(placement: Placement) => {
                return (
                  <div className={getSideAnimateClassName(placement)}>
                    {submenu}
                  </div>
                );
              }}
            >
              {(open) => <MenuArrow open={open} />}
            </Popover>
          ) : hasArrow ? (
            <MenuArrow open={false} />
          ) : null)}
      </div>
    </>
  );
};

export default MenuItem;

export function getRenderItem(item: Item) {
  const { submenu, unique, tooltip, placement = "bottom-start" } = item;
  if (tooltip) {
    return (
      <>
        <Tooltip content={tooltip} offset={15}>
          <MenuItem item={item} />
        </Tooltip>
      </>
    );
  }

  if (!!submenu && !unique) {
    return (
      <>
        <Popover
          placement={placement}
          offset={10}
          renderToBody={false}
          hasMaxHeight
          content={(placement: Placement) => {
            return (
              <div
                className={getSideAnimateClassName(placement)}
                style={{ height: "100%" }}
              >
                {submenu}
              </div>
            );
          }}
        >
          {(open) => <MenuItem open={open} item={item} />}
        </Popover>
      </>
    );
  }
  return <MenuItem item={item} />;
}
