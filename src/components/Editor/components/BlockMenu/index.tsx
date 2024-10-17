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
import { useHighlightBlock } from "../../plugin/highlight-block/useHighlightBlock";
import { useFontBlock } from "../../plugin/font-block/useFontBlock";

const BlockMenu: React.FC = () => {
  const typography = useTypography();
  const { highlightBlock } = useHighlightBlock();
  const { fontBlock, commandFontBlock } = useFontBlock();
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
        submenu: (
          <ColorPicker
            value={fontBlock?.fontBlock}
            onChange={(fontBlock) => {
              commandFontBlock({
                fontBlock,
              });
            }}
          />
        ),
        devider: true,
        hidden: highlightBlock?.isActive,
        submenuPopoverProps: {
          renderToBody: false,
          hideWhenContentClick: true,
        },
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
        submenuPopoverProps: {
          renderToBody: false,
          hideWhenContentClick: true,
        },
      },
    ];
  }, [typography, highlightBlock, fontBlock]);

  return <Menu items={items} />;
};

export default BlockMenu;
