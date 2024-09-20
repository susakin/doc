import React from "react";

type VoidProps = {
  className?: string;
  selectable?: boolean;
  children?: React.ReactNode;
};

const Void: React.FC<VoidProps> = ({ className, selectable, children }) => {
  return (
    <div
      contentEditable={false}
      className={className}
      style={{ userSelect: selectable ? undefined : "none" }}
    >
      {children}
    </div>
  );
};

export default Void;
