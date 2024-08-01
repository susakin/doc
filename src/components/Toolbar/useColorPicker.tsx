import React, { useState } from "react";
import styles from "./index.module.less";
import { FontcolorOutlined } from "../Icon";
import ColorPicker, { ColorSetting } from "../ColorPicker";

const useColorPicker = () => {
  const svgProps = { width: "1em", height: "1em", viewBox: "0 0 24 24" };
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
