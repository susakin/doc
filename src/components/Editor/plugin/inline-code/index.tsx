import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { Editor } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isMarkActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";

import styles from "./index.module.less";

const classNamePrefix = "inline-code";

export const INLINE_CODE_KEY = "inline-code";

const HOTKEYS: Record<string, string> = {
  "ctrl+shift+c": INLINE_CODE_KEY,
};

export class InlineCodePlugin extends LeafPlugin {
  public readonly key: string = INLINE_CODE_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const isActive = isMarkActive(this.editor as any, INLINE_CODE_KEY);
      const payload = {
        isActive,
      };
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, payload);
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public getCurrentStatus = () => {
    const inlineCode = isMarkActive(this.editor as any, INLINE_CODE_KEY);
    return {
      isActive: !!inlineCode,
    };
  };

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[INLINE_CODE_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        const inlineCode = HOTKEYS[hotkey];
        this.onCommand({ inlineCode });
      }
    }
  };

  public onCommand: CommandFn = ({ inlineCode }) => {
    if (this.editor) {
      const isActive = isMarkActive(this.editor, inlineCode);
      if (isActive) {
        Editor.removeMark(this.editor, inlineCode);
      } else {
        Editor.addMark(this.editor, inlineCode, true);
      }

      setTimeout(() => {
        this.event.trigger(
          EDITOR_EVENT.SELECTION_CHANGE,
          this.editor?.selection as any
        );
      });
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <span className={styles[`${classNamePrefix}`]}>{children}</span>;
  }
}

export const inlineCodePlugin = new InlineCodePlugin();
