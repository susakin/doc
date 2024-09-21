import React from "react";
import styles from "./index.module.less";
import cs from "classnames";
import "@/assets/less/variable.less";
import { usePropsValue } from "@/hooks/usePropsValue";
import Button from "../Button";
import FontColorSelect from "./FontColorSelect";
import BackgroundColorSelect from "./BackgroundColorSelect";
import { svgProps } from "@/utils";
import { ReplaceOutlined } from "../Icon";

export type ColorSetting = {
  color: string;
  backgroundColor: string;
  borderColor?: string;
  fillColor?: string;
};

export type PickerProps = {
  className?: string;
  colorSetting?: ColorSetting;
  value?: ColorSetting;
  onChange?: (value: ColorSetting) => void;
  defaultValue?: ColorSetting;
  hasRandom?: boolean;
  hasBorderColor?: boolean;
  hasFillColor?: boolean;
};

const defaultColorSetting = {
  color: "rgb(31, 35, 41)",
  backgroundColor: "transparent",
  borderColor: "rgb(255, 165, 61)",
  fillColor: "rgb(254, 234, 210)",
};

export type Color = {
  color: string;
  label: string;
};

const basicBackgroundColor: Color[] = [
  {
    label: "透明",
    color: "transparent",
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

const basicFillColor: Color[] = [
  {
    label: "透明",
    color: "transparent",
  },
  {
    label: "浅灰色",
    color: "rgba(239, 240, 241, 0.6)",
  },
  {
    label: "浅红色",
    color: "rgb(253, 226, 226)",
  },
  {
    label: "浅橙色",
    color: "rgb(254, 234, 210)",
  },
  {
    label: "浅黄色",
    color: "rgb(255, 255, 204)",
  },
  {
    label: "浅绿色",
    color: "rgb(217, 245, 214)",
  },
  {
    label: "浅蓝色",
    color: "rgb(225, 234, 255)",
  },
  {
    label: "浅紫色",
    color: "rgb(236, 226, 254)",
  },
];

const backgroundColor: Color[] = [
  ...basicFillColor,
  {
    label: "中灰色",
    color: "rgba(222, 224, 227, 0.8)",
  },
  ...basicBackgroundColor.slice(1),
];

const color: Color[] = [
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

const fillColor: Color[] = [
  ...basicFillColor,
  {
    label: "中灰色",
    color: "rgba(222, 224, 227, 0.7)",
  },
  {
    label: "灰色",
    color: "rgba(187, 191, 196, 0.5)",
  },
  {
    label: "中红色",
    color: "rgb(251, 191, 188)",
  },
  {
    label: "中橙色",
    color: "rgb(254, 212, 164)",
  },
  {
    label: "中黄色",
    color: "rgb(255, 252, 163)",
  },
  {
    label: "中绿色",
    color: "rgb(183, 237, 177)",
  },
  {
    label: "中蓝色",
    color: "rgb(186, 206, 253)",
  },
  {
    label: "中紫色",
    color: "rgb(205, 178, 250)",
  },
];

const classNamePrefix = "color-picker";

function createRandomIntGenerator(min: number, max: number, initValue: number) {
  let lastValue: number = initValue;
  return function () {
    let randomInt;
    do {
      randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomInt === lastValue);
    lastValue = randomInt;
    return randomInt;
  };
}

const randomInt = createRandomIntGenerator(0, 7, 3);

const ColorPicker: React.FC<PickerProps> = ({
  className,
  hasRandom,
  hasBorderColor,
  hasFillColor,
  ...rest
}) => {
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
      <div className={styles[`${classNamePrefix}-header`]}>
        <p className={styles[`${classNamePrefix}-title`]}>字体颜色</p>
        {hasRandom && (
          <div
            className={styles[`${classNamePrefix}-header-random`]}
            onClick={() => {
              const index = randomInt();
              setValue((v) => ({
                ...v,
                borderColor: basicBackgroundColor[index]?.color,
                fillColor: basicFillColor[index]?.color,
              }));
            }}
          >
            <ReplaceOutlined {...svgProps} />
            随机
          </div>
        )}
      </div>
      <FontColorSelect
        items={color}
        selectedColor={value?.color}
        onClick={({ color }) => {
          setValue((v) => ({ ...v, color }));
        }}
      />

      {hasBorderColor && (
        <>
          <p className={styles[`${classNamePrefix}-title`]}>边框颜色</p>
          <BackgroundColorSelect
            items={basicBackgroundColor}
            selectedColor={value?.borderColor}
            onClick={({ color }) => {
              setValue((v) => ({ ...v, borderColor: color }));
            }}
          />
        </>
      )}

      <p className={styles[`${classNamePrefix}-title`]}>
        {hasFillColor ? "填充" : "背景"}颜色
      </p>
      <BackgroundColorSelect
        items={hasFillColor ? fillColor : backgroundColor}
        selectedColor={value?.[hasFillColor ? "fillColor" : "backgroundColor"]}
        onClick={({ color }) => {
          setValue((v) => ({
            ...v,
            [hasFillColor ? "fillColor" : "backgroundColor"]: color,
          }));
        }}
      />
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

export default ColorPicker;
