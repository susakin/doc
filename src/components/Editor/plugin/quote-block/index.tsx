import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { getAttributeAtCursor, isBlockActive } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import styles from "./index.module.less";

export const QUOTE_KEY = "quote-block";

const HOTKEYS: Record<string, boolean> = {
  "ctrl+shift+>": true,
};

const classNamePrefix = "quote-block";

export class QuoteBlockPlugin extends BlockPlugin {
  public readonly key: string = QUOTE_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const quoteBlock = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!quoteBlock,
      });
    });

    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public match(props: RenderElementProps): boolean {
    return !!props.element[QUOTE_KEY];
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
          [this.key]: isActive ? undefined : true,
        },
        { at }
      );

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, { isActive });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children } = context;
    return <div className={styles[`${classNamePrefix}`]}>{children}</div>;
  }
}

export const quoteBlockPlugin = new QuoteBlockPlugin();
