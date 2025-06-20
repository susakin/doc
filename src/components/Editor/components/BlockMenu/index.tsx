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
import { useTypography } from "../HoverToolbar/useTypography";
import { svgProps } from "../../utils";
import { useHighlightBlock } from "../../plugin/highlight-block/useHighlightBlock";
import { useFontBlock } from "../../plugin/font-block/useFontBlock";
import AddBlockMenu from "../AddBlockMenu";
import { pluginController } from "../../plugin/base/controller";

type BlockMenuProps = {
  isDivider?: boolean;
};

const BlockMenu: React.FC<BlockMenuProps> = ({ isDivider }) => {
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
        hidden: isDivider,
      },
      {
        text: "缩进和对齐",
        ...typography,
        hidden: isDivider,
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
        hidden: highlightBlock?.isActive || isDivider,
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
        onClick() {
          pluginController.deleteSlectedElement();
        },
      },
      {
        text: "在下方添加",
        icon: <NewJoinMeetingOutlined {...svgProps} />,
        submenu: <AddBlockMenu />,
        submenuPopoverProps: {
          renderToBody: false,
          hideWhenContentClick: true,
        },
      },
    ];
  }, [typography, highlightBlock, fontBlock, isDivider]);

  return <Menu items={items} />;
};

export default BlockMenu;
