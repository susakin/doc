import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import { BlockContext } from "../../plugin/base";
import mergeRefs from "merge-refs";
import { pluginController } from "../../plugin/base/controller";
import {
  AddLinkPayload,
  EDITOR_EVENT,
  ElementMouseEventPayload,
} from "../../event/action";
import SelectedMask from "../SelectedMask";
import cs from "classnames";
import { RenderElementProps, useSlate, ReactEditor } from "slate-react";
import {
  BaseEditor,
  Editor,
  insertNodes,
  Path,
  removeNodes,
  Transforms,
  withoutNormalizing,
} from "slate";
import renderToContainer from "../../utils/renderToContainer";
import AddLink from "./AddLink";
import { HYPER_LINK_KEY } from "../../plugin/hyper-link";
import { TEXT_BLOCK_KEY } from "../../plugin/text-block";
import { HEADER_TITLE_KEY } from "../../plugin/header-title-block";
import { useDebounceFn } from "ahooks";
import { HEADING_KEY } from "../../plugin/heading";
import { TODO_BLCOK_KEY } from "../../plugin/todo-block";
import { HIGHLIGHT_BLOCK_KEY } from "../../plugin/highlight-block";
import { QUOTE_KEY } from "../../plugin/quote-block";
import { isEmptyElement } from "../../utils/slateHelper";

const classNamePrefix = "block";

type BlockProps = {
  children?: React.ReactNode;
} & BlockContext;

let timer: any;

const Block: React.FC<BlockProps> = ({ children, style, ...rest }) => {
  const elementDivRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<RenderElementProps["element"]>();
  const [selected, setSelected] = useState<boolean>(false);
  const mouseEnterRef = useRef<boolean>(false);
  const editor = useSlate();
  const { selection } = editor;
  const isSelectionChangingRef = useRef<boolean>(false);

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

    const addLinkEvent = ({ path, type }: AddLinkPayload) => {
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
                const props = { ...(elementRef.current as any) };
                insertNodes(
                  pluginController.editor as any,
                  {
                    ...(type === "set" ? props : {}),
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

  const elementActive = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (
      rest.element?.[HIGHLIGHT_BLOCK_KEY] ||
      rest.element?.[QUOTE_KEY] ||
      isSelectionChangingRef.current
    ) {
      return;
    }

    mouseEnterRef.current = true;
    pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, {
      element: rest.element,
      domElement: elementDivRef.current as any,
    });
  };

  const { run: delaySetChanging } = useDebounceFn(
    () => {
      isSelectionChangingRef.current = false;
    },
    {
      wait: 400,
    }
  );

  const elementInactive = () => {
    mouseEnterRef.current = false;
    pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_LEAVE, {
      element: rest.element,
      domElement: elementDivRef.current as any,
    });
  };

  const elementMouseInactive = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    clearTimeout(timer);
    timer = setTimeout(elementInactive, 800);
  };

  useEffect(() => {
    const element = rest.element;
    elementRef.current = element;
    if (mouseEnterRef.current || selected) {
      pluginController.event.trigger(EDITOR_EVENT.ELEMENT_MOUSE_ENTER, {
        element: rest.element,
        domElement: elementDivRef.current as any,
      });
    }
    const path = ReactEditor.findPath(editor as any, element as any);
    const isEmpty = isEmptyElement(editor, path);
    if (
      element?.[HEADING_KEY] === undefined &&
      element?.[TODO_BLCOK_KEY] === undefined &&
      element?.[HEADER_TITLE_KEY] === undefined &&
      !isEmpty &&
      !element?.[TEXT_BLOCK_KEY]
    ) {
      Transforms.setNodes(
        pluginController.editor as any,
        {
          [TEXT_BLOCK_KEY]: true,
        },
        {
          at: ReactEditor.findPath(
            pluginController.editor as any,
            element as any
          ),
        }
      );
    }
  }, [rest.element]);

  useEffect(() => {
    const path = ReactEditor.findPath(editor as any, rest.element as any);
    const isEmpty = isEmptyElement(editor, path);
    !isEmpty && elementInactive();
    isSelectionChangingRef.current = true;

    return () => {
      clearTimeout(timer);
      delaySetChanging();
    };
  }, [selection]);

  return (
    <div
      style={style}
      className={cs(styles[`${classNamePrefix}`], rest.classNameList)}
      {...rest.props.attributes}
      onMouseEnter={elementActive}
      onMouseMove={elementActive}
      onMouseLeave={elementMouseInactive}
      ref={mergeRefs(elementDivRef, rest.props.attributes?.ref)}
    >
      {children}
      {selected && <SelectedMask />}
    </div>
  );
};

export default Block;
