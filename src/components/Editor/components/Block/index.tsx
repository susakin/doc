import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import { BlockContext } from "../../plugin/base";
import mergeRefs from "merge-refs";
import { pluginController } from "../../plugin/base/controller";
import { EDITOR_EVENT } from "../../event/action";
import SelectedMask from "../SelectedMask";
import cs from "classnames";
import { RenderElementProps, useSlate, ReactEditor } from "slate-react";
import { BaseEditor, Editor, Path } from "slate";
import renderToContainer from "../../utils/renderToContainer";
import Popover from "../Tooltip/Popover";
import LinkEditPanel from "../Link/LinkEditPanel";

const classNamePrefix = "block";

type BlockProps = {
  children?: React.ReactNode;
} & BlockContext;

let timer: any;

const isEmptyText = (element: RenderElementProps["element"]) => {
  return (
    element?.children?.length === 1 &&
    (element.children[0] as any)?.text?.length === 0
  );
};

export function isElementFocused(
  editor: BaseEditor,
  element: RenderElementProps["element"]
) {
  const { selection } = editor;
  if (!selection || !element) return false;
  const selectionPath = Editor.path(editor, selection);
  const elementPath = ReactEditor.findPath(editor as any, element as any);
  return Path.isChild(selectionPath, elementPath);
}

const Block: React.FC<BlockProps> = ({ children, style, ...rest }) => {
  const elementDivRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<RenderElementProps["element"]>();
  const [selected, setSelected] = useState<boolean>(false);
  const mouseEnterRef = useRef<boolean>(false);
  const baseEdior = useSlate();
  const { selection } = baseEdior;
  const isFocused = isElementFocused(baseEdior, rest.element);
  const isEmpty = isEmptyText(rest?.element as any);
  const [isBlured, setIsBlured] = useState<boolean>(false);

  useEffect(() => {
    pluginController.event.on(
      EDITOR_EVENT.FLOAT_MENU_MOUSE_ENTER,
      (payload) => {
        setSelected(payload.domElement === elementDivRef.current);
      }
    );
    pluginController.event.on(EDITOR_EVENT.FLOAT_MENU_MOUSE_LEAVE, () => {
      setSelected(false);
    });

    pluginController.event.on(EDITOR_EVENT.BLUR, () => {
      setIsBlured(true);
    });

    pluginController.event.on(EDITOR_EVENT.FOCUS, () => {
      setIsBlured(false);
    });

    const addLinkEvent = (path: number[]) => {
      const currentPath = ReactEditor.findPath(
        pluginController.editor as any,
        elementRef.current as any
      );
      if (Path.equals(currentPath, path)) {
        const unmount = renderToContainer(
          <Popover
            renderToBody
            referenceElement={elementDivRef.current as any}
            offset={5}
            placement="bottom-start"
            trigger="click"
            open={true}
            content={
              <LinkEditPanel
                hasText
                onOk={({ url }) => {
                  unmount();
                }}
              />
            }
          />
        );
      }
    };

    pluginController.event.on(EDITOR_EVENT.ADD_LINK, addLinkEvent);

    return () => {
      pluginController.event.off(EDITOR_EVENT.ADD_LINK, addLinkEvent);
    };
  }, []);

  useEffect(() => {
    elementRef.current = rest.element;
    if (mouseEnterRef.current || selected) {
      pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, {
        element: rest.element,
        domElement: elementDivRef.current as any,
      });
    }
  }, [rest.element]);

  const elementMouseActive = () => {
    clearTimeout(timer);
    mouseEnterRef.current = true;
    pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, {
      element: rest.element,
      domElement: elementDivRef.current as any,
    });
  };

  const elementMouseInactive = () => {
    timer = setTimeout(() => {
      mouseEnterRef.current = false;
      pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_LEAVE, {
        element: rest.element,
        domElement: elementDivRef.current as any,
      });
    }, 800);
  };

  useEffect(() => {
    elementMouseInactive();
  }, [selection]);

  return (
    <div
      style={style}
      className={cs(styles[`${classNamePrefix}`], rest.classNameList)}
      {...rest.props.attributes}
      onMouseEnter={elementMouseActive}
      onMouseMove={elementMouseActive}
      onMouseLeave={elementMouseInactive}
      ref={mergeRefs(elementDivRef, rest.props.attributes?.ref)}
      data-placeholder={
        isEmpty && isFocused && !isBlured
          ? rest.element?.placeholder
          : undefined
      }
    >
      {children}
      {selected && <SelectedMask />}
    </div>
  );
};

export default Block;
