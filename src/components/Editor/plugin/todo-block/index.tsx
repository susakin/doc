import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Editor, Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { EDITOR_EVENT } from "../../event/action";
import cs from "classnames";
import styles from "./index.module.less";

export const TODO_BLCOK_KEY = "todo-block";

const HOTKEYS: Record<string, boolean> = {
  "ctrl+alt+t": true,
};

const classNamePrefix = "todo-block";

export class TodoBlockPlugin extends BlockPlugin {
  public readonly key: string = TODO_BLCOK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const quoteBlock = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!quoteBlock,
        quoteBlock,
      });
    });

    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[TODO_BLCOK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        this.onCommand(undefined as any);
      }
    }
  };

  public getCurrentStatus = () => {
    const quoteBlock = (this.selectedElement as any)?.[this.key];
    return {
      isActive: !!quoteBlock,
    };
  };

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const isActive = !!(this.selectedElement as any)?.[this.key];
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.setNodes(
        this.editor,
        {
          [this.key]: isActive ? undefined : { done: false },
        },
        { at }
      );

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, { isActive });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children } = context;
    const done = (context.element as any)?.[this.key]?.done;
    return (
      <div className={styles[`${classNamePrefix}`]}>
        <div contentEditable={false}>
          <div
            className={cs(styles[`${classNamePrefix}-checkbox`], {
              [styles[`${classNamePrefix}-checkbox-checked`]]: done,
            })}
            onClick={() => {
              Editor.withoutNormalizing(this.editor as any, () => {
                const at = ReactEditor.findPath(
                  this.editor as any,
                  this.selectedElement as any
                );
                Transforms.setNodes(
                  this.editor as any,
                  {
                    [this.key]: { done: !done },
                  },
                  { at }
                );
              });
            }}
          />
        </div>
        <span
          className={cs({
            [styles[`${classNamePrefix}-done`]]: done,
          })}
        >
          {children}
        </span>
      </div>
    );
  }
}

export const todoBlockPlugin = new TodoBlockPlugin();
