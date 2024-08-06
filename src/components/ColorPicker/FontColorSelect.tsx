import React from "react";
import styles from "./fontColorSelect.module.less";
import { Color } from ".";
import Tooltip from "../Tooltip";
import Button from "./Button";
import { Font } from "../Icon";

const classNamePrefix = "font-color-select";

type FontColorSelectProps = {
  items: Color[];
  selectedColor?: Color["color"];
  onClick?: (color: Color) => void;
};

const FontColorSelect: React.FC<FontColorSelectProps> = ({
  items,
  selectedColor,
  onClick,
}) => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      {items.map((item, index) => {
        const { color, label } = item;
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
            <Button
              selected={color === selectedColor}
              className={styles[`${classNamePrefix}-button`]}
              onClick={() => {
                onClick?.(item);
              }}
            >
              <Font size={22} viewBox="0 0 22 22" fill={color} />
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default FontColorSelect;
