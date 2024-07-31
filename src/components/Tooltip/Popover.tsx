import React, { useEffect, useMemo, useRef, useState } from "react";
import { Wrapper } from "./Wrapper";
import { Placement, UseFloatingOptions } from "@floating-ui/react";

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
  children?: React.ReactElement | ((open: boolean) => React.ReactNode);
  content?:
    | ((side: Placement, arrowRef: any, context: any) => React.ReactNode)
    | React.ReactNode;
  trigger?: "click" | "hover";
  strategy?: "fixed" | "absolute";
  openDelay?: number;
  offset?: number;
  enabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideWhenContentClick?: boolean;
  renderToBody?: boolean;
} & Pick<UseFloatingOptions, "placement">;

const Popover: React.FC<PopoverProps> = ({
  trigger = "hover",
  openDelay = 0,
  strategy = "absolute",
  enabled = true,
  onOpenChange,
  hideWhenContentClick,
  renderToBody = true,
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
      return rest.content(placement, arrowRef, context);
    } else {
      return rest.content;
    }
  }, [placement, rest.content, arrowRef, context]);

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

  const Container: any = renderToBody ? FloatingPortal : React.Fragment;
  const children =
    typeof rest.children === "function" ? rest.children(open) : rest.children;

  return (
    <>
      <Wrapper ref={wrapperRef} {...getReferenceProps()}>
        {children}
      </Wrapper>
      {open && (
        <Container>
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
            {content}
          </div>
        </Container>
      )}
    </>
  );
};

export default Popover;
