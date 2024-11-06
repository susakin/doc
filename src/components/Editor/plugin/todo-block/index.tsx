import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { EDITOR_EVENT } from "../../event/action";
import TodoBlock from "./TodoBlock";
import { TEXT_BLOCK_KEY } from "../text-block";
import { HEADING_KEY } from "../heading";
import { pluginController } from "../base/controller";
import {
  isFocusLineEnd,
  isFocusLineStart,
  isMatchedEvent,
} from "../../utils/slateHelper";
import { KEYBOARD } from "../../utils/constant";

export const TODO_BLCOK_KEY = "todo-block";

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

  public matchHotkey(event: ReactEventMap["react_keydown"]) {
    const hotkey = "ctrl+alt+t";
    if (isHotkey(hotkey, event.nativeEvent)) {
      event.preventDefault();
      this.onCommand(undefined as any);
    }
  }

  public matchNatureKeyboard(event: ReactEventMap["react_keydown"]) {
    const editor = this.editor as any;
    const element = this.selectedElement as any;
    if (!element?.[this.key]) return false;

    if (isMatchedEvent(event, KEYBOARD.BACKSPACE, KEYBOARD.ENTER)) {
      //删除
      const path = ReactEditor.findPath(editor as any, element as any);
      if (event.key === KEYBOARD.BACKSPACE && isFocusLineStart(editor, path)) {
        event.preventDefault();
        event.stopPropagation();
        Transforms.unsetNodes(editor, [this.key], { at: path });
        return;
      }
      if (isFocusLineEnd(editor, path)) {
        event.preventDefault();
        event.stopPropagation();
        Transforms.insertNodes(editor, { children: [{ text: "" }] });
      }
    }
  }

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    this.matchHotkey(event);
    this.matchNatureKeyboard(event);
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
        Object.assign(
          {
            [this.key]: isActive ? undefined : { done: false },
          },
          !isActive
            ? {
                [TEXT_BLOCK_KEY]: undefined,
                [HEADING_KEY]: undefined,
              }
            : {}
        ),
        { at }
      );

      pluginController.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor.selection
      );
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !isActive,
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children, element } = context;

    return (
      <TodoBlock editor={this.editor} element={element}>
        {children}
      </TodoBlock>
    );
  }
}

export const todoBlockPlugin = new TodoBlockPlugin();
