import { RenderElementProps } from "slate-react";
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
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const quoteBlock = getAttributeAtCursor(this.editor, QUOTE_KEY);
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
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
    const quoteBlock = getAttributeAtCursor(this.editor, this.key);
    return {
      isActive: !!quoteBlock,
    };
  };

  public onCommand: CommandFn = ({ at }: any) => {
    if (this.editor) {
      const isActive = isBlockActive(this.editor, QUOTE_KEY, true);
      Transforms.setNodes(
        this.editor,
        {
          [this.key]: isActive ? undefined : true,
        },
        { at }
      );
      setTimeout(() => {
        this.event.trigger(
          EDITOR_EVENT.SELECTION_CHANGE,
          this.editor?.selection as any
        );
      });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children } = context;
    return <div className={styles[`${classNamePrefix}`]}>{children}</div>;
  }
}

export const quoteBlockPlugin = new QuoteBlockPlugin();
