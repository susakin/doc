import React, { useMemo } from "react";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import styles from "./linkMenu.module.less";
import {
  CancelLinkOutlined,
  EditOutlined,
  GlobalLinkOutlined,
  TitleViewOutlined,
} from "../Icon";
import { svgProps } from "../../utils/getSideAnimateClassName";
import LinkViewMenu from "./LinkVewMenu";
import { HyperLinkConfig } from "../../plugin/hyper-link";

export type LinkMenuProps = {
  config?: HyperLinkConfig;
  onRemoveLink?: () => void;
  onEdit?: () => void;
  onSwitchDisplayMode?: (key: HyperLinkConfig["displayMode"]) => void;
};

const LinkMenu: React.FC<LinkMenuProps> = ({
  config,
  onRemoveLink,
  onSwitchDisplayMode,
  onEdit,
}) => {
  const { url } = config || {};

  const items = useMemo<Item[]>(() => {
    const isLinkDisplayMode = config?.displayMode === "link";
    return [
      {
        render() {
          return <div className={styles["link"]}>{url}</div>;
        },
      },
      {
        icon: <EditOutlined {...svgProps} />,
        tooltip: "编辑链接",
        onClick: onEdit,
      },
      {
        icon: <CancelLinkOutlined {...svgProps} />,
        tooltip: "移除链接",
        devider: true,
        onClick: onRemoveLink,
      },
      {
        icon: isLinkDisplayMode ? (
          <GlobalLinkOutlined {...svgProps} />
        ) : (
          <TitleViewOutlined {...svgProps} />
        ),
        text: isLinkDisplayMode ? "链接视图" : "标题视图",
        submenu: (
          <LinkViewMenu
            displayMode={config?.displayMode}
            onClick={onSwitchDisplayMode}
          />
        ),
        submenuPopoverProps: {
          placement: "bottom-start",
          renderToBody: false,
          offset: 9,
        },
      },
    ];
  }, [config]);

  return <HorizontalMenu items={items} />;
};

export default LinkMenu;
