import React, { useMemo } from "react";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import styles from "./linkMenu.module.less";
import { CancelLinkOutlined, EditOutlined, GlobalLinkOutlined } from "../Icon";
import { svgProps } from "@/utils";
import LinkViewMenu from "./LinkVewMenu";

const LinkMenu: React.FC = () => {
  const items = useMemo<Item[]>(() => {
    return [
      {
        render() {
          return (
            <div className={styles["link"]}>
              https://www.baiudcom.1111111111111111111111111111111111111
            </div>
          );
        },
      },
      {
        icon: <EditOutlined {...svgProps} />,
        tooltip: "编辑链接",
      },
      {
        icon: <CancelLinkOutlined {...svgProps} />,
        tooltip: "移除链接",
        devider: true,
      },
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        text: "链接视图",
        submenu: <LinkViewMenu />,
      },
    ];
  }, []);

  return <HorizontalMenu items={items} />;
};

export default LinkMenu;
