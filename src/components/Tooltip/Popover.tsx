import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "./Wrapper";
import { UseFloatingOptions } from "@floating-ui/react";

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
  hide,
} from "@floating-ui/react";

export type PopoverProps = {
  children?: React.ReactElement;
  content?: React.ReactNode;
  trigger?: "click" | "hover";
  strategy?: "fixed" | "absolute";
  openDelay?: number;
  offset?: number;
  enabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideWhenContentClick?: boolean;
  className?: string;
  arrow?: React.ReactNode;
} & Pick<UseFloatingOptions, "placement">;

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  trigger = "hover",
  openDelay = 0,
  strategy = "absolute",
  enabled = true,
  onOpenChange,
  hideWhenContentClick,
  className,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<Wrapper>(null);
  const isTriggerClick = trigger === "click";
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open]);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
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
      {open && (
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
              {!!rest.arrow && (
                <div
                  ref={arrowRef}
                  style={{
                    position: "absolute",
                    display: "flex",
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y,
                  }}
                >
                  {rest.arrow}
                </div>
              )}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Popover;
