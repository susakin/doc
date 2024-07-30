import React, { useMemo } from "react";
import styles from "./index.module.less";
import cs from "classnames";
import { DownBoldOutlined } from "../Icon";
import Popover from "../Tooltip/Popover";
import { getSideAnimateClassName } from "@/utils";
import { Placement } from "@floating-ui/react";
import Tooltip from "../Tooltip";
import { TextOutlined, TypographyOutlined, BoldOutlined } from "../Icon";
import Typography from "../Typography";

type Item = {
  icon?: React.ReactNode;
  submenu?: React.ReactNode;
  devider?: boolean;
  unique?: boolean;
  tooltip?: React.ReactNode;
  active?: boolean;
};

type ToolbarProps = {};

const classNamePrefix = "toolbar";

const Toolbar: React.FC<ToolbarProps> = () => {
  const items = useMemo<(Item | undefined)[]>(() => {
    const svgProps = { width: "1em", height: "1em", viewBox: "0 0 24 24" };
    return [
      {
        icon: <TextOutlined {...svgProps} />,
        submenu: <></>,
        devider: true,
      },
      {
        icon: <TypographyOutlined {...svgProps} />,
        submenu: <Typography />,
        devider: true,
      },
      {
        icon: <BoldOutlined {...svgProps} />,
        tooltip: (
          <>
            <span>
              <span>粗体</span>
              <span> (Ctrl + B)</span>
            </span>
          </>
        ),
        active: true,
      },
    ];
  }, []);

  function getRenderItem({ icon, submenu, unique, tooltip, active }: Item) {
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
            [styles[`${classNamePrefix}-item-active`]]: active,
          })}
        >
          <div className={styles[`${classNamePrefix}-item-icon`]}>{icon}</div>
          {!!submenu &&
            (unique ? (
              <Popover
                placement="bottom-start"
                offset={10}
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
            placement="bottom-start"
            offset={10}
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
