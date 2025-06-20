import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Transforms } from "slate";
import { EDITOR_EVENT } from "../../event/action";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import BlockPlaceholder from "../../components/Block/BlockPlaceholder";
import { HEADING_KEY } from "../heading";
import { TODO_BLCOK_KEY } from "../todo-block";
import { pluginController } from "../base/controller";
import { isFocusLineEnd, isMatchedEvent } from "../../utils/slateHelper";
import { KEYBOARD } from "../../utils/constant";

export const TEXT_BLOCK_KEY = "text-block";

export class TextBlockPlugin extends BlockPlugin {
  public readonly key: string = TEXT_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const textBlock = (element as any)?.[this.key];

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!textBlock,
      });
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public matchHotKey(event: ReactEventMap["react_keydown"]) {
    const hotkey = "ctrl+alt+0";
    if (isHotkey(hotkey, event.nativeEvent)) {
      event.preventDefault();
      this.onCommand(undefined as any);
    }
  }

  public matchNatureKeyboard(event: ReactEventMap["react_keydown"]) {
    const editor = this.editor as any;
    const element = this.selectedElement as any;
    if (!element?.[this.key]) return false;
    if (isMatchedEvent(event, KEYBOARD.ENTER)) {
      //删除
      const path = ReactEditor.findPath(editor as any, element as any);

      if (isFocusLineEnd(editor, path)) {
        event.preventDefault();
        Transforms.insertNodes(editor, { children: [{ text: "" }] });
      }
    }
  }

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    this.matchHotKey(event);
    this.matchNatureKeyboard(event);
  };

  public getCurrentStatus = () => {
    const textBlock = (this.selectedElement as any)?.[this.key];
    return {
      isActive: !!textBlock,
    };
  };

  public match(props: RenderElementProps): boolean {
    return !!props.element[TEXT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );

      Transforms.setNodes(
        this.editor,
        Object.assign({
          [this.key]: true,
          [HEADING_KEY]: undefined,
          [TODO_BLCOK_KEY]: undefined,
        }),
        {
          at,
        }
      );

      pluginController.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor.selection
      );

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: true,
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    return (
      <BlockPlaceholder element={context.element}>
        {context.children}
      </BlockPlaceholder>
    );
  }
}

export const textBlockPlugin = new TextBlockPlugin();
