import React, { useEffect, useMemo, useState } from "react";
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

export type InlinePopoverProps = {
  content?: ((props: { side: Placement }) => React.ReactNode) | React.ReactNode;
  openDelay?: number;
  offset?: number;
  enabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderToBody?: boolean;
  domRange?: Range;
} & Pick<UseFloatingOptions, "placement">;

const InlinePopover: React.FC<InlinePopoverProps> = ({
  openDelay = 0,
  enabled = true,
  onOpenChange,
  renderToBody = true,
  domRange,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
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

  useEffect(() => {
    if (domRange) {
      setOpen(true);
      refs.setPositionReference({
        getBoundingClientRect: () => domRange.getBoundingClientRect(),
        getClientRects: () => domRange.getClientRects(),
      });
    } else {
      //setOpen(false);
    }
  }, [domRange]);

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
