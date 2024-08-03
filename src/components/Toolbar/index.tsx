import React, { useMemo } from "react";
import styles from "./index.module.less";
import cs from "classnames";
import {
  DownBoldOutlined,
  GlobalLinkOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "../Icon";
import Popover from "../Tooltip/Popover";
import { getSideAnimateClassName, svgProps } from "@/utils";
import { Placement } from "@floating-ui/react";
import Tooltip from "../Tooltip";
import { TextOutlined, BoldOutlined, HorizontalLineOutlined } from "../Icon";
import { useColorPicker } from "./useColorPicker";
import { useTypography } from "./useTypography";
import { useInlineMenu } from "./useInlineMenu";

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

const Arrow = function ({ open }: { open?: boolean }) {
  return (
    <div
      className={cs(styles[`${classNamePrefix}-item-submenu`], {
        [styles[`${classNamePrefix}-item-submenu-hovered`]]: open,
      })}
    >
      <span className={styles[`${classNamePrefix}-item-submenu-icon`]}>
        <DownBoldOutlined viewBox="0 0 24 24" height="1em" width="1em" />
      </span>
    </div>
  );
};

const MenuItem = function ({
  unique,
  active,
  icon,
  submenu,
  open,
}: Item & { open?: boolean }) {
  return (
    <>
      <div
        className={cs(styles[`${classNamePrefix}-item`], {
          [styles[`${classNamePrefix}-item-unique`]]: unique,
          [styles[`${classNamePrefix}-item-active`]]: active,
          [styles[`${classNamePrefix}-item-hovered`]]: open && !unique,
        })}
      >
        <div className={styles[`${classNamePrefix}-item-icon`]}>{icon}</div>
        {!!submenu &&
          (unique ? (
            <Popover
              placement="bottom"
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
              {(open) => <Arrow open={open} />}
            </Popover>
          ) : (
            <Arrow open={false} />
          ))}
      </div>
    </>
  );
};

const Toolbar: React.FC<ToolbarProps> = () => {
  const colorPicker = useColorPicker();
  const typography = useTypography();
  const inlineMenu = useInlineMenu();
  const items = useMemo<(Item | undefined)[]>(() => {
    return [
      inlineMenu,
      typography,
      {
        icon: <BoldOutlined {...svgProps} />,
        tooltip: "粗体 (Ctrl + B)",
        active: true,
      },
      {
        icon: <HorizontalLineOutlined {...svgProps} />,
        tooltip: "粗体 (Ctrl + Sfhit + X)",
      },
      {
        icon: <ItalicOutlined {...svgProps} />,
        tooltip: "斜体 (Ctrl + I)",
      },
      {
        icon: <UnderlineOutlined {...svgProps} />,
        tooltip: "下划线 (Ctrl + U)",
      },
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        tooltip: "链接 (Ctrl + K)",
      },
      colorPicker,
    ];
  }, [colorPicker, typography]);

  function getRenderItem({ icon, submenu, unique, tooltip, active }: Item) {
    if (tooltip) {
      return (
        <>
          <Tooltip content={tooltip}>
            <MenuItem
              icon={icon}
              submenu={submenu}
              unique={unique}
              active={active}
            />
          </Tooltip>
        </>
      );
    }

    if (!!submenu && !unique) {
      return (
        <>
          <Popover
            placement="bottom-start"
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
            {(open) => (
              <MenuItem
                open={open}
                icon={icon}
                submenu={submenu}
                unique={unique}
                active={active}
              />
            )}
          </Popover>
        </>
      );
    }
    return (
      <MenuItem icon={icon} submenu={submenu} unique={unique} active={active} />
    );
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
