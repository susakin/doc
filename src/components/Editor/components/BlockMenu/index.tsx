import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import StyleSetOutlined from "../Icon/StyleSetOutlined";
import ColorPicker from "../ColorPicker";
import {
  ClipOutlined,
  CopyOutlined,
  DeleteTrashOutlined,
  NewJoinMeetingOutlined,
} from "../Icon";
import MenuList from "./MeunList";
import EmptyBlockMenu from "../EmptyBlockMenu";
import { useTypography } from "../HoverToolbar/useTypography";
import { svgProps } from "../../utils/getSideAnimateClassName";

const BlockMenu: React.FC = () => {
  const typography = useTypography();
  const items = useMemo<Item[]>(() => {
    return [
      {
        devider: true,
        render() {
          return <MenuList />;
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
        devider: true,
      },
      {
        text: "在下方添加",
        icon: <NewJoinMeetingOutlined {...svgProps} />,
        submenu: <EmptyBlockMenu />,
      },
    ];
  }, [typography]);

  return <Menu items={items} />;
};

export default BlockMenu;
