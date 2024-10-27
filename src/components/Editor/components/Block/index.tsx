import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import { BlockContext } from "../../plugin/base";
import mergeRefs from "merge-refs";
import { pluginController } from "../../plugin/base/controller";
import { EDITOR_EVENT, ElementMouseEventPayload } from "../../event/action";
import SelectedMask from "../SelectedMask";
import cs from "classnames";
import { RenderElementProps, useSlate, ReactEditor } from "slate-react";
import {
  BaseEditor,
  Editor,
  insertNodes,
  Path,
  removeNodes,
  withoutNormalizing,
} from "slate";
import renderToContainer from "../../utils/renderToContainer";
import AddLink from "./AddLink";
import { HYPER_LINK_KEY } from "../../plugin/hyper-link";
import { TEXT_BLOCK_KEY } from "../../plugin/text-block";
import { HEADER_TITLE_KEY } from "../../plugin/header-title-block";

const classNamePrefix = "block";

type BlockProps = {
  children?: React.ReactNode;
} & BlockContext;

let timer: any;

export const isEmptyText = (element: RenderElementProps["element"]) => {
  if (!element) return true;
  try {
    const text = Editor.string(
      pluginController.editor as any,
      ReactEditor.findPath(pluginController.editor as any, element as any)
    );

    return text?.length === 0;
  } catch (e) {
    return true;
  }
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

  useEffect(() => {
    const onMouseEnter = (payload: ElementMouseEventPayload) => {
      setSelected(payload.domElement === elementDivRef.current);
    };
    const onMouseLeave = () => {
      setSelected(false);
    };

    pluginController.event.on(
      EDITOR_EVENT.FLOAT_MENU_MOUSE_ENTER,
      onMouseEnter
    );
    pluginController.event.on(
      EDITOR_EVENT.FLOAT_MENU_MOUSE_LEAVE,
      onMouseLeave
    );

    const addLinkEvent = (path: number[]) => {
      const currentPath = ReactEditor.findPath(
        pluginController.editor as any,
        elementRef.current as any
      );
      if (Path.equals(currentPath, path)) {
        const unmount = renderToContainer(
          <AddLink
            referenceElement={elementDivRef.current as any}
            onAddLink={({ url, text = "" }) => {
              withoutNormalizing(pluginController.editor as any, () => {
                removeNodes(pluginController.editor as any, {
                  at: currentPath,
                });
                insertNodes(
                  pluginController.editor as any,
                  {
                    [TEXT_BLOCK_KEY]: true,
                    children: [
                      {
                        text,
                        [HYPER_LINK_KEY]: {
                          displayMode: "title",
                          url,
                        },
                      },
                    ],
                  },
                  {
                    at: currentPath,
                  }
                );
                unmount();
              });
            }}
          />
        );
      }
    };

    pluginController.event.on(EDITOR_EVENT.ADD_LINK, addLinkEvent);

    return () => {
      pluginController.event.off(EDITOR_EVENT.ADD_LINK, addLinkEvent);
      pluginController.event.off(
        EDITOR_EVENT.FLOAT_MENU_MOUSE_ENTER,
        onMouseEnter
      );
      pluginController.event.off(
        EDITOR_EVENT.FLOAT_MENU_MOUSE_LEAVE,
        onMouseLeave
      );
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
    if (rest.element?.[HEADER_TITLE_KEY]) {
      return;
    }

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
    >
      {children}
      {selected && <SelectedMask />}
    </div>
  );
};

export default Block;
