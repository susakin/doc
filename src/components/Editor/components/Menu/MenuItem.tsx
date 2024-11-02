import React from "react";
import styles from "./menuItem.module.less";
import { Item } from ".";
import cs from "classnames";
import DoneOutlined from "../Icon/DoneOutlined";
import RightSmallOutlined from "../Icon/RightSmallOutlined";
import Popover from "../Tooltip/Popover";
import Tooltip from "../Tooltip";
import AnimationWrapper from "../Tooltip/AnimationWrapper";
import { svgProps } from "../../utils";

const classNamePrefix = "menu-item";

type MenuItemProps = {
  item: Item;
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { active, disabled, onClick, submenu, icon, text, suffix, danger } =
    item;
  return (
    <div
      className={cs(styles[`${classNamePrefix}`], {
        [styles[`${classNamePrefix}-active`]]: active,
        [styles[`${classNamePrefix}-disabled`]]: disabled,
        [styles[`${classNamePrefix}-danger`]]: danger,
      })}
      onClick={(e) => {
        disabled ? e.stopPropagation() : onClick?.(e);
      }}
    >
      {!!icon && (
        <div className={styles[`${classNamePrefix}-icon`]}>{icon}</div>
      )}
      <div className={styles[`${classNamePrefix}-text`]}>{text}</div>
      <div className={styles[`${classNamePrefix}-suffix`]}>
        {active ? (
          <DoneOutlined {...svgProps} />
        ) : !!submenu ? (
          <RightSmallOutlined {...svgProps} />
        ) : (
          suffix
        )}
      </div>
    </div>
  );
};

export function getRenderItem(item: Item) {
  const { render, tooltip, submenu, submenuPopoverProps } = item;
  const {
    renderToBody,
    hideWhenContentClick,
    placement = "right",
  } = submenuPopoverProps || {};
  if (render) {
    return render();
  }

  if (submenu) {
    return (
      <Popover
        placement={placement}
        offset={5}
        renderToBody={renderToBody}
        hideWhenContentClick={hideWhenContentClick}
        content={({ side }) => {
          return <AnimationWrapper side={side}>{submenu}</AnimationWrapper>;
        }}
      >
        <MenuItem item={item} />
      </Popover>
    );
  }

  if (tooltip) {
    return (
      <>
        <Tooltip content={tooltip} renderToBody placement="right" offset={12}>
          <MenuItem item={item} />
        </Tooltip>
      </>
    );
  }
  return <MenuItem item={item} />;
}

export default MenuItem;
