import React, { useMemo } from "react";
import styles from "./index.module.less";
import cs from "classnames";
import { DownBoldOutlined } from "../Icon";
import Popover from "../Tooltip/Popover";
import { getSideAnimateClassName } from "@/utils";
import { Placement } from "@floating-ui/react";
import Tooltip from "../Tooltip";

type Item = {
  icon?: React.ReactNode;
  submenu?: React.ReactNode;
  devider?: boolean;
  unique?: boolean;
  tooltip?: React.ReactNode;
};

type ToolbarProps = {};

const classNamePrefix = "toolbar";

const Toolbar: React.FC<ToolbarProps> = () => {
  const items = useMemo<(Item | undefined)[]>(() => {
    return [];
  }, []);

  function getRenderItem({ icon, submenu, unique, tooltip, ...rest }: Item) {
    const arrow = (
      <div className={styles[`${classNamePrefix}-item-submenu`]}>
        <DownBoldOutlined viewBox="0 0 24 24" height="1em" width="1em" />
      </div>
    );

    const item = (
      <>
        <div
          className={cs(styles[`${classNamePrefix}-item`], {
            [styles[`${classNamePrefix}-item-unique`]]: unique,
          })}
        >
          <div className={styles[`${classNamePrefix}-item-icon`]}>{icon}</div>
          {!!submenu &&
            (unique ? (
              <Popover
                placement="bottom"
                content={(placement: Placement) => {
                  return (
                    <div className={getSideAnimateClassName(placement)}>
                      {submenu}
                    </div>
                  );
                }}
              >
                {arrow}
              </Popover>
            ) : (
              arrow
            ))}
        </div>
      </>
    );

    if (tooltip) {
      return (
        <>
          <Tooltip content={tooltip}>{item}</Tooltip>
        </>
      );
    }

    if (!!submenu && !unique) {
      return (
        <>
          <Popover
            placement="bottom"
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
        </>
      );
    }
    return <>{item}</>;
  }

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
                <div className={styles[`${classNamePrefix}-item-devider`]} />
              )}
            </>
          );
        })}
    </div>
  );
};

export default Toolbar;
