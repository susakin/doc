import React, { useMemo } from "react";
import styles from "./index.module.less";
import { GlobalLinkOutlined, ItalicOutlined, UnderlineOutlined } from "../Icon";
import { svgProps } from "@/utils";
import { BoldOutlined, HorizontalLineOutlined } from "../Icon";
import { useColorPicker } from "./useColorPicker";
import { useTypography } from "./useTypography";
import { useInlineMenu } from "./useInlineMenu";
import { getRenderItem } from "./MenuItem";

export type Item = {
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
