import React, { useMemo } from "react";
import {
  CalloutOutlined,
  DisorderListOutlined,
  H1Outlined,
  H2Outlined,
  H3Outlined,
  OrderListOutlined,
  ReferenceOutlined,
  TextOutlined,
} from "../Icon";
import { Item } from "../HorizontalMenu";
import FlattenMenu from "./FlattenMenu";
import { svgProps } from "../../utils/getSideAnimateClassName";

type MenuListProps = {};

const MenuList: React.FC<MenuListProps> = ({}) => {
  const items = useMemo<Item[]>(() => {
    return [
      {
        icon: <TextOutlined {...svgProps} />,
        tooltip: "正文(Ctrl + Alt + 0)",
      },
      {
        icon: <H1Outlined {...svgProps} />,
        tooltip: "一级标题(Ctrl + Alt + 1)",
      },
      {
        icon: <H2Outlined {...svgProps} />,
        tooltip: "二级标题(Ctrl + Alt + 2)",
      },
      {
        icon: <H3Outlined {...svgProps} />,
        tooltip: "三级标题(Ctrl + Alt + 3)",
      },
      {
        icon: <OrderListOutlined {...svgProps} />,
        tooltip: "有序列表(Ctrl + Shift + 7)",
      },
      {
        icon: <DisorderListOutlined {...svgProps} />,
        tooltip: "无序列表(Ctrl + Shift + 8)",
      },
      {
        icon: <ReferenceOutlined {...svgProps} />,
        tooltip: "引用(Ctrl + Shift + >)",
      },
      {
        icon: <CalloutOutlined {...svgProps} />,
        tooltip: "高亮块",
      },
    ];
  }, []);
  return <FlattenMenu items={items} />;
};

export default MenuList;
