import React from "react";
import styles from "./todoBlock.module.less";
import { ReactEditor, RenderElementProps } from "slate-react";
import { useEditorIsfoucesed } from "../../hooks/useEditorIsFocused";
import { BaseEditor, Editor, Transforms } from "slate";
import cs from "classnames";
import { TODO_BLCOK_KEY } from ".";
import { isElementFocused } from "../../utils/slateHelper";

const classNamePrefix = "todo-block";

type TodoBlockProps = {
  element?: RenderElementProps["element"];
  editor?: BaseEditor;
  children?: React.ReactNode;
};

const TodoBlock: React.FC<TodoBlockProps> = ({ element, editor, children }) => {
  const done = (element as any)?.[TODO_BLCOK_KEY]?.done;
  const isEleFocused = isElementFocused(editor as any, element as any);
  const { isFocused } = useEditorIsfoucesed();
  return (
    <div
      className={cs(styles[`${classNamePrefix}`], {
        [styles[`${classNamePrefix}-focused`]]: isEleFocused && isFocused,
      })}
    >
      <span
        className={cs(styles[`${classNamePrefix}-checkbox`], {
          [styles[`${classNamePrefix}-checkbox-checked`]]: done,
        })}
        contentEditable={false}
        onClick={(e) => {
          Editor.withoutNormalizing(editor as any, () => {
            const at = ReactEditor.findPath(editor as any, element as any);
            Transforms.setNodes(
              editor as any,
              {
                [TODO_BLCOK_KEY]: { done: !done },
              },
              { at }
            );
          });
        }}
      />
      <span className={cs({ [styles[`${classNamePrefix}-done`]]: done })}>
        {children}
      </span>
    </div>
  );
};

export default TodoBlock;
