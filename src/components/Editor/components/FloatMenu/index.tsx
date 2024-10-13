import React, { useEffect, useState } from "react";
import { pluginController } from "../../plugin/base/controller";
import { EDITOR_EVENT } from "../../event/action";
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
import styles from "./index.module.less";
import MenuTrigger from "../MenuTrigger";
import cs from "classnames";

const classNamePrefix = "float-menu";

const FloatMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: "left-start",
    strategy: "fixed",
    open,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [inline(), shift(), offset(5), flip(), hide()],
  });

  const role = useRole(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss, role]);

  useEffect(() => {
    pluginController.event.on(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, (payload) => {
      if (payload.domElement) {
        refs.setReference(payload.domElement);
        setOpen(true);
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
            <MenuTrigger />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default FloatMenu;
