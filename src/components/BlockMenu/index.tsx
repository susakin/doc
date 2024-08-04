import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import FlattenMenu from "./FlattenMenu";
import { svgProps } from "@/utils";
import { useTypography } from "../Toolbar/useTypography";
import StyleSetOutlined from "../Icon/StyleSetOutlined";
import ColorPicker from "../ColorPicker";
import { ClipOutlined, CopyOutlined, DeleteTrashOutlined } from "../Icon";

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
      {
        text: "颜色",
        icon: <StyleSetOutlined {...svgProps} />,
        submenu: <ColorPicker />,
        devider: true,
      },
      {
        text: "剪切",
        tooltip: "Ctrl + X",
        icon: <ClipOutlined {...svgProps} />,
      },
      {
        text: "复制",
        tooltip: "Ctrl + C",
        icon: <CopyOutlined {...svgProps} />,
      },
      {
        text: "删除",
        icon: <DeleteTrashOutlined {...svgProps} />,
        danger: true,
      },
    ];
  }, [typography]);
  return <Menu items={items} />;
};

export default BlockMenu;
