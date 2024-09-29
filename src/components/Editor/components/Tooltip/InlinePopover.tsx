import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Placement, UseFloatingOptions } from "@floating-ui/react";

import {
  useFloating,
  useInteractions,
  FloatingPortal,
  shift,
  flip,
  autoUpdate,
  offset,
  useDismiss,
  useRole,
  hide,
  inline,
} from "@floating-ui/react";
import { useUpdateEffect } from "ahooks";

export type InlinePopoverProps = {
  content?: ((props: { side: Placement }) => React.ReactNode) | React.ReactNode;
  openDelay?: number;
  offset?: number;
  enabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderToBody?: boolean;
  randomKey?: string;
  open?: boolean | undefined;
} & Pick<UseFloatingOptions, "placement">;

const InlinePopover: React.FC<InlinePopoverProps> = ({
  openDelay = 0,
  enabled = true,
  onOpenChange,
  renderToBody = true,
  randomKey,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  useUpdateEffect(() => {
    onOpenChange?.(open);
  }, [open]);

  useEffect(() => {
    typeof rest.open !== "undefined" && setOpen(rest.open);
  }, [rest.open]);

  const { refs, floatingStyles, context, middlewareData, placement } =
    useFloating({
      placement: rest.placement,
      strategy: !renderToBody ? "absolute" : "fixed",
      open,
      onOpenChange(open) {
        setOpen(open);
      },
      whileElementsMounted: autoUpdate,
      middleware: [inline(), shift(), offset(rest.offset), flip(), hide()],
    });

  const content = useMemo(() => {
    if (typeof rest.content === "function") {
      return rest.content({
        side: placement,
      });
    } else {
      return rest.content;
    }
  }, [placement, rest.content]);
  const role = useRole(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss, role]);

  useLayoutEffect(() => {
    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt?.(0);

    if (domRange) {
      setOpen(true);
      refs.setPositionReference({
        getBoundingClientRect: () => domRange.getBoundingClientRect(),
        getClientRects: () => domRange.getClientRects(),
      });
    }
  }, [randomKey]);

  const Container: any = renderToBody ? FloatingPortal : React.Fragment;

  return (
    <>
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
          >
            {content}
          </div>
        </Container>
      )}
    </>
  );
};

export default InlinePopover;
