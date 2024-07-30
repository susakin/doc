import React, { useMemo } from "react";
import Menu, { Item } from "../Menu";
import {
  CenterAlignmentOutlined,
  LeftAlignmentOutlined,
  RightAlignmentOutlined,
  MaybeOutlined,
} from "../Icon";

const Typography: React.FC = () => {
  const items = useMemo<Item[]>(() => {
    const svgProps = { width: "1em", height: "1em", viewBox: "0 0 24 24" };
    return [
      {
        icon: <LeftAlignmentOutlined {...svgProps} />,
        text: "左对齐",
        active: true,
        tooltip: "Ctrl + Shift + L",
      },
      {
        icon: <CenterAlignmentOutlined {...svgProps} />,
        text: "居中对齐",
        tooltip: "Ctrl + Shift + E",
      },
      {
        icon: <RightAlignmentOutlined {...svgProps} />,
        text: "右对齐",
        devider: true,
        tooltip: "Ctrl + Shift + R",
      },
      {
        icon: <LeftAlignmentOutlined {...svgProps} />,
        text: "增加缩进",
        tooltip: "无法缩进当前内容块",
        disabled: true,
        suffix: <MaybeOutlined {...svgProps} />,
      },
    ];
  }, []);
  return <Menu items={items} />;
};

export default Typography;
