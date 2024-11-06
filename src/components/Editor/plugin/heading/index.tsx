import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { EDITOR_EVENT } from "../../event/action";
import styles from "./index.module.less";
import { isHotkey } from "../../utils/isHotkey";
import { TEXT_BLOCK_KEY } from "../text-block";
import BlockPlaceholder from "../../components/Block/BlockPlaceholder";
import { TODO_BLCOK_KEY } from "../todo-block";
import {
  isFocusLineEnd,
  isFocusLineStart,
  isMatchedEvent,
} from "../../utils/slateHelper";
import { KEYBOARD } from "../../utils/constant";
import { pluginController } from "../base/controller";

const classNamePrefix = "heading";

export const HEADING_KEY = "heading";

export type Heading =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9";

const HOTKEYS: Record<string, Heading> = {
  "ctrl+alt+1": "h1",
  "ctrl+alt+2": "h2",
  "ctrl+alt+3": "h3",
  "ctrl+alt+4": "h4",
  "ctrl+alt+5": "h5",
  "ctrl+alt+6": "h6",
  "ctrl+alt+7": "h7",
  "ctrl+alt+8": "h8",
  "ctrl+alt+9": "h9",
};

export class HeadingPlugin extends BlockPlugin {
  public readonly key: string = HEADING_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const heading = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!heading,
        heading,
      });
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public getCurrentStatus = () => {
    const heading = (this.selectedElement as any)?.[this.key];
    return {
      isActive: !!heading,
      heading,
    };
  };

  public match({ element }: RenderElementProps): boolean {
    return !!element[HEADING_KEY];
  }

  public destroy?: (() => void) | undefined;

  public matchHotkey(event: ReactEventMap["react_keydown"]) {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const heading = HOTKEYS[hotkey];
        this.onCommand({ heading });
      }
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
    return this.matchNatureKeyboard(event);
  };

  public onCommand: CommandFn = ({ heading }) => {
    if (this.editor) {
      const isActive = (this.selectedElement as any)?.[this.key] === heading;
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.setNodes(
        this.editor,
        {
          heading: isActive ? undefined : heading,
          placeholder: isActive ? undefined : heading,
          [TODO_BLCOK_KEY]: undefined,
          [TEXT_BLOCK_KEY]: undefined,
        },
        { at }
      );

      pluginController.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor.selection
      );

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!heading,
        heading,
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children, element } = context;
    const heading = element.heading;
    if (heading) {
      const headingStyles: Record<string, string> = {
        h1: styles[`${classNamePrefix}-1`],
        h2: styles[`${classNamePrefix}-2`],
        h3: styles[`${classNamePrefix}-3`],
        h4: styles[`${classNamePrefix}-4`],
        h5: styles[`${classNamePrefix}-5`],
        h6: styles[`${classNamePrefix}-6`],
        h7: styles[`${classNamePrefix}-7`],
        h8: styles[`${classNamePrefix}-8`],
        h9: styles[`${classNamePrefix}-9`],
      };
      context.classNameList?.push(headingStyles[heading as any]);
    }
    return <BlockPlaceholder element={element}>{children}</BlockPlaceholder>;
  }
}

export const headingPlugin = new HeadingPlugin();
