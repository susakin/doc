import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import FlattenMenu from "./FlattenMenu";
import { svgProps } from "@/utils";
import { useTypography } from "../Toolbar/useTypography";
const BlockMenu: React.FC = () => {
  const typography = useTypography();
  const items = useMemo<Item[]>(() => {
    return [
      {
        devider: true,
        render() {
          return <FlattenMenu />;
        },
      },
      {
        text: "缩进和对齐",
        ...typography,
      },
    ];
  }, [typography]);
  return <Menu items={items} />;
};

export default BlockMenu;
