import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import { GlobalLinkOutlined, TitleViewOutlined } from "../Icon";
import { svgProps } from "@/utils";

const LinkViewMenu: React.FC = () => {
  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <GlobalLinkOutlined {...svgProps} />,
        text: "链接视图",
      },
      {
        icon: <TitleViewOutlined {...svgProps} />,
        text: "标题视图",
      },
    ];
  }, []);

  return <Menu items={items} />;
};

export default LinkViewMenu;
