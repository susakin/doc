import React, { useMemo } from "react";
import styles from "./index.module.less";
import cs from "classnames";
import DoneOutlined from "../Icon/DoneOutlined";
import Tooltip from "../Tooltip";
import Popover from "../Tooltip/Popover";
import { Placement } from "@floating-ui/react";
import { getSideAnimateClassName } from "@/utils";
import RightSmallOutlined from "../Icon/RightSmallOutlined";
import TextOutlined from "../Icon/TextOutlined";

const classNamePrefix = "menu";

type Item = {
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
};

const Menu: React.FC = () => {
  const svgProps = { width: "1em", height: "1em", viewBox: "0 0 24 24" };
  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <TextOutlined {...svgProps} />,
      },
    ];
  }, []);

  function getRenderItem({
    icon,
    render,
    suffix,
    text,
    active,
    tooltip,
    submenu,
    disabled,
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
      >
        <div className={styles[`${classNamePrefix}-inner-item-icon`]}>
          {icon}
        </div>
        <div className={styles[`${classNamePrefix}-inner-item-text`]}>
          {text}
        </div>
        <div className={styles[`${classNamePrefix}-inner-item-suffix`]}>
          {active ? (
            <DoneOutlined viewBox="0 0 24 24" width="1em" height="1em" />
          ) : !!submenu ? (
            <RightSmallOutlined viewBox="0 0 24 24" width="1em" height="1em" />
          ) : (
            suffix
          )}
        </div>
      </div>
    );

    if (submenu) {
      <Popover
        placement="right"
        content={(placement: Placement) => {
          return (
            <div className={getSideAnimateClassName(placement)}>{submenu}</div>
          );
        }}
      >
        {item}
      </Popover>;
    }

    return (
      <>
        <Tooltip content={tooltip}>{item}</Tooltip>
      </>
    );
  }

  return (
    <div className={styles[`${classNamePrefix}`]}>
      <div className={styles[`${classNamePrefix}-inner`]}>
        {items.map((item) => {
          const { devider } = item;
          const renderItem = getRenderItem(item);
          return (
            <>
              {renderItem}
              {devider && (
                <div className={styles[`${classNamePrefix}-inner-devider`]} />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
