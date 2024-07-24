import React from "react";
import Popover from "../Tooltip/Popover";
import styles from "./index.module.less";
import cs from "classnames";
import { Side } from "@floating-ui/react";
import "@/assets/less/variable.less";
import Tooltip from "../Tooltip";
import { default as ColorButton } from "./Button";
import { Font } from "../Icon";
import { usePropsValue } from "@/hooks/usePropsValue";
import Button from "../Button";

type ColorSetting = {
  color: string;
  backgroundColor: string;
};

type PickerProps = {
  className?: string;
  colorSetting?: ColorSetting;
  value?: ColorSetting;
  onChange?: (value: ColorSetting) => void;
  defaultValue?: ColorSetting;
};

const defaultColorSetting = {
  color: "rgb(31, 35, 41)",
  backgroundColor: "none",
};

type Color = {
  color: string;
  label: string;
};

const backgroundColorConfig: Color[] = [
  {
    label: "透明",
    color: "none",
  },
  {
    label: "浅灰色",
    color: "rgb(242, 243, 245)",
  },
  {
    label: "浅红色",
    color: "rgb(251, 191, 188)",
  },
  {
    label: "浅橙色",
    color: "rgba(254, 212, 164, 0.8)",
  },
  {
    label: "浅黄色",
    color: "rgba(255, 246, 122, 0.8",
  },
  {
    label: "浅绿色",
    color: "rgba(183, 237, 177, 0.8)",
  },
  {
    label: "浅蓝色",
    color: "rgba(186, 206, 253, 0.7)",
  },
  {
    label: "浅紫色",
    color: "rgba(205, 178, 250, 0.7)",
  },
  {
    label: "中灰色",
    color: "rgba(222, 224, 227, 0.8)",
  },
  {
    label: "灰色",
    color: "rgb(187, 191, 196)",
  },
  {
    label: "红色",
    color: "rgb(247, 105, 100)",
  },
  {
    label: "橙色",
    color: "rgb(255, 165, 61)",
  },
  {
    label: "黄色",
    color: "rgb(255, 233, 40)",
  },
  {
    label: "绿色",
    color: "rgb(98, 210, 86)",
  },
  {
    label: "蓝色",
    color: "rgba(78, 131, 253, 0.55)",
  },
  {
    label: "紫色",
    color: "rgba(147, 90, 246, 0.55)",
  },
];

const colorConfig: Color[] = [
  {
    label: "黑色",
    color: "rgb(31, 35, 41)",
  },
  {
    label: "灰色",
    color: "rgb(143, 149, 158)",
  },
  {
    label: "红色",
    color: "rgb(216, 57, 49)",
  },
  {
    label: "橙色",
    color: "rgb(222, 120, 2)",
  },
  {
    label: "黄色",
    color: "rgb(220, 155, 4)",
  },
  {
    label: "绿色",
    color: "rgb(46, 161, 33)",
  },
  {
    label: "蓝色",
    color: "rgb(36, 91, 219)",
  },
  {
    label: "紫色",
    color: "rgb(100, 37, 208)",
  },
];

const Picker: React.FC<PickerProps> = ({ className, ...rest }) => {
  const classNamePrefix = "picker";
  const [value, setValue] = usePropsValue<ColorSetting>({
    value: rest.value,
    defaultValue: rest.defaultValue || defaultColorSetting,
    onChange: (v) => {
      if (v === null) return;
      rest.onChange?.(v);
    },
  });

  return (
    <div className={cs(className, styles[`${classNamePrefix}`])}>
      <p className={styles[`${classNamePrefix}-title`]}>字体颜色</p>
      <div className={styles[`${classNamePrefix}-color`]}>
        {colorConfig.map(({ color, label }, index) => {
          return (
            <Tooltip
              content={label}
              placement="top"
              key={index}
              size="small"
              hasArrow={false}
              offset={5}
              renderToBody={false}
            >
              <ColorButton
                selected={color === value?.color}
                className={styles[`${classNamePrefix}-color-button`]}
                onClick={() => {
                  setValue((v) => ({ ...v, color }));
                }}
              >
                <Font size={22} viewBox="0 0 22 22" fill={color} />
              </ColorButton>
            </Tooltip>
          );
        })}
      </div>
      <p className={styles[`${classNamePrefix}-title`]}>背景颜色</p>
      <div className={styles[`${classNamePrefix}-background-color`]}>
        {backgroundColorConfig.map(({ color, label }, index) => {
          const selected = color === value?.backgroundColor;
          return (
            <Tooltip
              content={label}
              placement="top"
              key={index}
              size="small"
              hasArrow={false}
              renderToBody={false}
              offset={5}
            >
              <ColorButton
                selected={selected}
                className={styles[`${classNamePrefix}-background-color-button`]}
                onClick={() => {
                  setValue((v) => ({ ...v, backgroundColor: color }));
                }}
              >
                <div
                  style={{
                    backgroundColor: color,
                    boxShadow: selected ? "inset 0 0 0 1px #fff" : "",
                  }}
                  className={
                    styles[`${classNamePrefix}-background-color-button-inner`]
                  }
                />
              </ColorButton>
            </Tooltip>
          );
        })}
      </div>
      <div className={styles[`${classNamePrefix}-foot`]}>
        <Button
          className={styles[`${classNamePrefix}-foot-button`]}
          onClick={() => {
            setValue(defaultColorSetting);
          }}
        >
          恢复默认
        </Button>
      </div>
    </div>
  );
};

type ColorPickerProps = {
  children?: React.ReactElement;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ children }) => {
  return (
    <Popover
      offset={8}
      content={(placement) => {
        const [side] = placement.split("-") as [Side];
        const position = {
          left: "slide-right-in",
          right: "slide-left-in",
          top: "slide-bottom-in",
          bottom: "slide-up-in",
        };
        return <Picker className={position[side]} />;
      }}
    >
      {children}
    </Popover>
  );
};

export default ColorPicker;
