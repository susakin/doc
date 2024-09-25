import React, { useMemo } from "react";
import HorizontalMenu, { Item } from "../HorizontalMenu";
import { svgProps } from "@/utils";
import { StyleSetOutlined } from "../Icon";
import ColorPicker, { PickerProps } from "../ColorPicker";

export type HighlightMenuProps = Pick<PickerProps, "value" | "onChange">;

const HighlightMenu: React.FC<HighlightMenuProps> = ({ value, onChange }) => {
  const items = useMemo<(Item | undefined)[]>(() => {
    return [
      {
        text: "颜色",
        icon: <StyleSetOutlined {...svgProps} />,
        submenu: (
          <ColorPicker
            hasBorderColor
            hasRandom
            hasFillColor
            value={value}
            onChange={onChange}
          />
        ),
        hasArrow: false,
        submenuPopoverProps: {
          placement: "bottom",
          renderToBody: false,
        },
      },
    ];
  }, [value]);

  return <HorizontalMenu items={items} />;
};

export default HighlightMenu;
