import { Placement } from "@floating-ui/react";
import React from "react";
import { getSideAnimateClassName } from "../../utils";

type AnimationWrapperProps = {
  side: Placement;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  side,
  style,
  children,
}) => {
  return (
    <div className={getSideAnimateClassName(side)} style={style}>
      {children}
    </div>
  );
};

export default AnimationWrapper;
