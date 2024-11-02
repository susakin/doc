import styles from "./useColorPicker.module.less";
import { FontcolorOutlined } from "../Icon";
import ColorPicker, { defaultColorSetting } from "../ColorPicker";
import { svgProps } from "../../utils";
import { useFontLeaf } from "../../plugin/font-leaf/useFontLeaf";

export const useColorPicker = () => {
  const { fontLeaf, commandFontLeaf } = useFontLeaf();
  return {
    unique: true,
    icon: (
      <span
        className={styles[`font-icon`]}
        style={{
          color: fontLeaf?.color,
          backgroundColor: fontLeaf?.backgroundColor,
        }}
      >
        <FontcolorOutlined {...svgProps} />
      </span>
    ),
    submenu: (
      <ColorPicker
        value={{
          color: fontLeaf?.color || defaultColorSetting?.color,
          backgroundColor:
            fontLeaf?.backgroundColor || defaultColorSetting?.backgroundColor,
        }}
        onChange={(v) => {
          commandFontLeaf(v);
        }}
      />
    ),
  };
};

export default useColorPicker;
