import type { FC } from "react";

type VoidProps = {
  className?: string;
  selectable?: string;
  children?: React.ReactNode;
};

export const Void: FC<VoidProps> = (props) => {
  const { className, selectable = true } = props;
  return (
    <div
      contentEditable={false}
      className={className}
      style={{ userSelect: selectable ? undefined : "none" }}
    >
      {props.children}
    </div>
  );
};
