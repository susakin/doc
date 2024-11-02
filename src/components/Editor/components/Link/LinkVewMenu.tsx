import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import { GlobalLinkOutlined, TitleViewOutlined } from "../Icon";
import { svgProps } from "../../utils";
import { HyperLinkConfig } from "../../plugin/hyper-link";

type LinkViewMenuProps = {
  onClick?: (key: HyperLinkConfig["displayMode"]) => void;
} & Pick<HyperLinkConfig, "displayMode">;

const LinkViewMenu: React.FC<LinkViewMenuProps> = ({
  displayMode,
  onClick,
}) => {
  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        text: "链接视图",
        key: "link",
        active: displayMode === "link",
      },
      {
        icon: <TitleViewOutlined {...svgProps} />,
        text: "标题视图",
        key: "title",
        active: displayMode === "title",
      },
    ];
  }, [displayMode]);

  return (
    <Menu
      items={items}
      onClick={(e, item) => {
        onClick?.(item?.key as any);
      }}
    />
  );
};

export default LinkViewMenu;
