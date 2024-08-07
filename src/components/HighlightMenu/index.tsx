import React, { useMemo } from "react";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import { svgProps } from "@/utils";
import { StyleSetOutlined } from "../Icon";
import ColorPicker from "../ColorPicker";

const HighlightMenu = () => {
  const items = useMemo<(Item | undefined)[]>(() => {
    return [
      {
        text: "颜色",
        icon: <StyleSetOutlined {...svgProps} />,
        submenu: <ColorPicker hasBorderColor hasRandom hasFillColor />,
        hasArrow: false,
        placement: "bottom",
      },
    ];
  }, []);

  return <HorizontalMenu items={items} />;
};

export default HighlightMenu;
