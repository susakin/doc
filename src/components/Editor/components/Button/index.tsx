import React from "react";
import styles from "./index.module.less";
import cs from "classnames";

const classNamePrefix = "button";

export type ButtonProps = {
  className?: string;
  type?: "default";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | unknown;
};

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  type = "default",
  onClick,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={cs(
        styles[`${classNamePrefix}`],
        className,
        styles[`${classNamePrefix}-${type}`]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
