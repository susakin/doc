import React from "react";
import styles from "./index.module.less";
import cs from "classnames";
import DoneOutlined from "../Icon/DoneOutlined";
import Tooltip from "../Tooltip";
import Popover from "../Tooltip/Popover";
import { Placement } from "@floating-ui/react";
import { getSideAnimateClassName, svgProps } from "@/utils";
import RightSmallOutlined from "../Icon/RightSmallOutlined";

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
  function getRenderItem({
    icon,
    render,
    suffix,
    text,
    active,
    tooltip,
    submenu,
    disabled,
    onClick,
  }: Item) {
    if (render) {
      return render();
    }
    const item = (
      <div
        className={cs(styles[`${classNamePrefix}-inner-item`], {
          [styles[`${classNamePrefix}-inner-item-active`]]: active,
          [styles[`${classNamePrefix}-inner-item-disabled`]]: disabled,
        })}
        onClick={onClick}
      >
        <div className={styles[`${classNamePrefix}-inner-item-icon`]}>
          {icon}
        </div>
        <div className={styles[`${classNamePrefix}-inner-item-text`]}>
          {text}
        </div>
        <div className={styles[`${classNamePrefix}-inner-item-suffix`]}>
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

    if (submenu) {
      return (
        <Popover
          placement="right"
          offset={5}
          renderToBody={false}
          content={(placement: Placement) => {
            return (
              <div className={getSideAnimateClassName(placement)}>
                {submenu}
              </div>
            );
          }}
        >
          {item}
        </Popover>
      );
    }

    if (tooltip) {
      return (
        <>
          <Tooltip content={tooltip} renderToBody placement="right" offset={12}>
            {item}
          </Tooltip>
        </>
      );
    }
    return <>{item}</>;
  }

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
