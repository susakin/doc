import React, { useEffect, useMemo, useRef, useState } from "react";
import { Wrapper } from "./Wrapper";
import { Placement, size, UseFloatingOptions } from "@floating-ui/react";

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
import { flushSync } from "react-dom";
import { useUpdateEffect } from "ahooks";

export type PopoverProps = {
  children?: React.ReactElement | ((open: boolean) => React.ReactNode);
  content?:
    | ((props: {
        side: Placement;
        arrowRef: any;
        context: any;
        maxHeight?: number;
        maxWidth?: number;
      }) => React.ReactNode)
    | React.ReactNode;
  trigger?: "click" | "hover";
  openDelay?: number;
  offset?: number;
  enabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideWhenContentClick?: boolean;
  renderToBody?: boolean;
  hasMaxHeight?: boolean;
  hasMaxWidth?: boolean;
  hasSafePolygon?: boolean;
  referenceElement?: HTMLElement;
} & Pick<UseFloatingOptions, "placement">;

const Popover: React.FC<PopoverProps> = ({
  trigger = "hover",
  openDelay = 0,
  enabled = true,
  onOpenChange,
  hideWhenContentClick,
  renderToBody = true,
  hasMaxWidth,
  hasMaxHeight,
  hasSafePolygon = true,
  referenceElement,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<Wrapper>(null);
  const isTriggerClick = trigger === "click";
  const arrowRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState<number>();
  const [maxWidth, setMaxWidth] = useState<number>();

  useEffect(() => {
    typeof rest.open !== "undefined" && setOpen(rest.open);
  }, [rest.open]);

  useUpdateEffect(() => {
    onOpenChange?.(open);
  }, [open]);

  const { refs, floatingStyles, context, middlewareData, placement } =
    useFloating({
      placement: rest.placement,
      strategy: !renderToBody ? "absolute" : "fixed",
      open,
      onOpenChange(open) {
        setOpen(open);
      },
      whileElementsMounted: autoUpdate,
      middleware: [
        shift(),
        offset(rest.offset),
        flip(),
        size({
          apply({ availableWidth, availableHeight }) {
            flushSync(() => {
              hasMaxWidth && setMaxWidth(availableWidth);
              hasMaxHeight && setMaxHeight(availableHeight);
            });
          },
        }),
        arrow({
          element: arrowRef,
        }),
        hide(),
      ],
    });

  const content = useMemo(() => {
    if (typeof rest.content === "function") {
      return rest.content({
        side: placement,
        arrowRef,
        context,
        maxHeight,
        maxWidth,
      });
    } else {
      return rest.content;
    }
  }, [placement, rest.content, arrowRef, context, maxHeight, maxWidth]);

  const click = useClick(context, {
    enabled: isTriggerClick && enabled,
  });

  const role = useRole(context);

  const hover = useHover(context, {
    delay: {
      open: openDelay,
    },
    enabled: !isTriggerClick && enabled,
    handleClose: hasSafePolygon ? safePolygon() : undefined,
  });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
  ]);

  useEffect(() => {
    refs.setReference(
      !referenceElement
        ? (wrapperRef?.current?.element as any)
        : referenceElement
    );
  }, [referenceElement]);

  const Container: any = renderToBody ? FloatingPortal : React.Fragment;
  const children =
    typeof rest.children === "function" ? rest.children(open) : rest.children;

  return (
    <>
      {!referenceElement && (
        <Wrapper ref={wrapperRef} {...getReferenceProps()}>
          {children}
        </Wrapper>
      )}
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
