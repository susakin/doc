import React from "react";
import cs from "classnames";
import styles from "./button.module.less";

const classNamePrefix = "button";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | unknown;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  selected,
}) => {
  return (
    <button
      className={cs(
        styles[`${classNamePrefix}`],
        {
          [styles[`${classNamePrefix}-selected`]]: selected,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
