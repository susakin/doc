import React from "react";
import styles from "./menuItem.module.less";
import cs from "classnames";
import Popover from "../Tooltip/Popover";
import { DownBoldOutlined } from "../Icon";
import Tooltip from "../Tooltip";
import { Item } from ".";
import AnimationWrapper from "../Tooltip/AnimationWrapper";

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
    submenuPopoverProps,
    hasArrow = true,
    render,
    text,
    onClick,
    key,
  } = item;
  const { placement = "bottom", renderToBody = true } =
    submenuPopoverProps || {};
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
        onClick={onClick}
        key={key}
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
              renderToBody={renderToBody}
              offset={10}
              content={({ side }) => {
                return (
                  <AnimationWrapper side={side}>{submenu}</AnimationWrapper>
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
  const { submenu, unique, tooltip, submenuPopoverProps } = item;
  const {
    placement = "bottom-start",
    renderToBody = true,
    hideWhenContentClick,
    openDelay,
    offset = 10,
  } = submenuPopoverProps || {};
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
          offset={offset}
          openDelay={openDelay}
          renderToBody={renderToBody}
          hideWhenContentClick={hideWhenContentClick}
          hasMaxHeight
          content={({ side, maxHeight }) => {
            return (
              <AnimationWrapper side={side} style={{ maxHeight }}>
                {submenu}
              </AnimationWrapper>
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
