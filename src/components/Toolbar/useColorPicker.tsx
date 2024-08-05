import { useState } from "react";
import styles from "./useColorPicker.module.less";
import { FontcolorOutlined } from "../Icon";
import ColorPicker, { ColorSetting } from "../ColorPicker";
import { svgProps } from "@/utils";

export const useColorPicker = () => {
  const [colorSetting, setColorSetting] = useState<ColorSetting>();

  return {
    unique: true,
    icon: (
      <span
        className={styles[`font-icon`]}
        style={{
          color: colorSetting?.color,
          backgroundColor: colorSetting?.backgroundColor,
        }}
      >
        <FontcolorOutlined {...svgProps} />
      </span>
    ),
    submenu: (
      <ColorPicker value={colorSetting} onChange={(v) => setColorSetting(v)} />
    ),
  };
};

export default useColorPicker;
