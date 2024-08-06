import React from "react";
import styles from "./backgroundColorSelect.module.less";
import { Color } from ".";
import Tooltip from "../Tooltip";
import Button from "./Button";

const classNamePrefix = "background-color-select";

type BackgroundColorSelectProps = {
  items: Color[];
  selectedColor?: Color["color"];
  onClick?: (color: Color) => void;
};

const BackgroundColorSelect: React.FC<BackgroundColorSelectProps> = ({
  items,
  selectedColor,
  onClick,
}) => {
  return (
    <div className={styles[`${classNamePrefix}`]}>
      {items.map((item, index) => {
        const { color, label } = item;
        const selected = color === selectedColor;
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
            <Button
              selected={selected}
              className={styles[`${classNamePrefix}-button`]}
              onClick={() => {
                onClick?.(item);
              }}
            >
              <div
                style={{
                  backgroundColor: color,
                  boxShadow: selected ? "inset 0 0 0 1px #fff" : "",
                }}
                className={styles[`${classNamePrefix}-button-inner`]}
              />
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default BackgroundColorSelect;
