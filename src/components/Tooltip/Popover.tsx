import React, { useEffect, useMemo, useRef, useState } from "react";
import { Wrapper } from "./Wrapper";
import {
  Alignment,
  Placement,
  Side,
  UseFloatingOptions,
} from "@floating-ui/react";

import {
  useFloating,
  useHover,
  useClick,
  useInteractions,
  FloatingPortal,
  shift,
  flip,
  autoUpdate,
  offset,
  useDismiss,
  safePolygon,
  arrow,
  useRole,
  FloatingArrow,
  hide,
} from "@floating-ui/react";

export type PopoverProps = {
  children?: React.ReactElement;
  content?: ((placement: Placement) => React.ReactNode) | React.ReactNode;
  trigger?: "click" | "hover";
  strategy?: "fixed" | "absolute";
  openDelay?: number;
  offset?: number;
  enabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideWhenContentClick?: boolean;
  className?: string;
  hasArrow?: boolean;
} & Pick<UseFloatingOptions, "placement">;

const Popover: React.FC<PopoverProps> = ({
  children,
  trigger = "hover",
  openDelay = 0,
  strategy = "absolute",
  enabled = true,
  onOpenChange,
  hideWhenContentClick,
  className,
  hasArrow,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<Wrapper>(null);
  const isTriggerClick = trigger === "click";
  const arrowRef = useRef(null);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open]);

  const { refs, floatingStyles, context, middlewareData, placement } =
    useFloating({
      placement: rest.placement,
      strategy,
      open,
      onOpenChange(open) {
        setOpen(open);
      },
      whileElementsMounted: autoUpdate,
      middleware: [
        hide(),
        shift(),
        flip(),
        arrow({
          element: arrowRef,
        }),
        offset(rest.offset),
      ],
    });

  const content = useMemo(() => {
    if (typeof rest.content === "function") {
      return rest.content(placement);
    } else {
      return rest.content;
    }
  }, [placement, rest.content]);

  const click = useClick(context, {
    enabled: isTriggerClick && enabled,
  });

  const role = useRole(context);

  const hover = useHover(context, {
    delay: {
      open: openDelay,
    },
    enabled: !isTriggerClick && enabled,
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
  ]);

  useEffect(() => {
    refs.setReference(wrapperRef?.current?.element as any);
  }, []);

  return (
    <>
      <Wrapper ref={wrapperRef} {...getReferenceProps()}>
        {children}
      </Wrapper>
      {true && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              zIndex: 1,
              visibility: middlewareData.hide?.referenceHidden
                ? "hidden"
                : "visible",
              outline: "none",
              ...floatingStyles,
            }}
            {...getFloatingProps()}
            onClick={
              hideWhenContentClick
                ? () => {
                    setOpen(false);
                  }
                : undefined
            }
          >
            <div className={className}>
              {content}
              {hasArrow && (
                <FloatingArrow
                  style={{ transform: `rotate(180deg)` }}
                  fill="#1f2329"
                  height={8}
                  width={16}
                  d="M4.438 1.993L7.253 5.16a1 1 0 001.494 0l2.815-3.166A5.938 5.938 0 0116 0H0c1.696 0 3.311.725 4.438 1.993z"
                  viewBox="0 0 16 8"
                  ref={arrowRef}
                  context={context}
                />
              )}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
