import React, { useEffect, useRef, useState } from "react";
import { pluginController } from "../../plugin/base/controller";
import { EDITOR_EVENT, ElementMouseEventPayload } from "../../event/action";
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
} from "@floating-ui/react";
import styles from "./index.module.less";
import MenuTrigger from "../MenuTrigger";
import cs from "classnames";
import { useDebounceFn } from "ahooks";
import { RenderElementProps } from "slate-react";
import { HEADER_TITLE_KEY } from "../../plugin/header-title-block";

const classNamePrefix = "float-menu";

const FloatMenu: React.FC = () => {
  const isHoveringRef = useRef<boolean>(false);
  const elementPlayloadRef = useRef<ElementMouseEventPayload>();
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: "left-start",
    strategy: "fixed",
    open,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [shift(), offset(5), flip(), hide()],
  });

  const role = useRole(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss, role]);
  const [activeElement, setActiveElement] =
    useState<RenderElementProps["element"]>();

  const { run: debounceSetOpen, cancel } = useDebounceFn(
    () => {
      setOpen(false);
    },
    {
      wait: 400,
    }
  );

  useEffect(() => {
    let isHoverMenuActive = false;
    pluginController.event.on(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, (payload) => {
      if (
        payload.domElement &&
        !isHoverMenuActive &&
        !payload.element?.[HEADER_TITLE_KEY]
      ) {
        cancel();
        setActiveElement(payload.element);
        refs.setReference(payload.domElement);
        elementPlayloadRef.current = payload;
        setOpen(true);
      }
    });

    pluginController.event.on(EDITOR_EVENT.HOVER_MENU_ACTIVE, (isActive) => {
      if (isActive) {
        setOpen(false);
      }
      isHoverMenuActive = isActive;
    });

    pluginController.event.on(EDITOR_EVENT.ELEMENT_MOUSE_LEAVE, () => {
      if (!isHoveringRef.current) {
        setOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setActive(open);
    });
  }, [open]);

  return (
    <>
      {open && (
        <FloatingPortal>
          <div
            className={cs({ [styles[`${classNamePrefix}`]]: active })}
            ref={refs.setFloating}
            onMouseEnter={() => {
              cancel();
              isHoveringRef.current = true;
              pluginController.event.trigger(
                EDITOR_EVENT.FLOAT_MENU_MOUSE_ENTER,
                elementPlayloadRef.current as any
              );
            }}
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
            <MenuTrigger
              activeElement={activeElement}
              onOpenChange={(open) => {
                if (!open) {
                  isHoveringRef.current = false;
                  debounceSetOpen(false);
                  pluginController.event.trigger(
                    EDITOR_EVENT.FLOAT_MENU_MOUSE_LEAVE,
                    undefined
                  );
                }
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default FloatMenu;
