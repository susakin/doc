import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import { EDITOR_EVENT } from "../../event/action";
import styles from "./index.module.less";
import { getParentNodeByKey } from "../../utils/slateHelper";

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
      const at = ReactEditor.findPath(this.editor as any, element as any);
      const parentNode = getParentNodeByKey(this.editor as any, at, this.key);
      const node = parentNode ?? element;

      const isActive = !!(node as any)?.[this.key];

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive,
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
    const element = this.selectedElement;
    const at = ReactEditor.findPath(this.editor as any, element as any);
    const parentNode = getParentNodeByKey(this.editor as any, at, this.key);
    const node = parentNode ?? element;

    const isActive = !!(node as any)?.[this.key];
    return {
      isActive,
    };
  };

  public onCommand: CommandFn = () => {
    if (this.editor) {
      let at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      const parentNode = getParentNodeByKey(this.editor as any, at, this.key);
      const node = parentNode ?? this.selectedElement;
      at = parentNode
        ? ReactEditor.findPath(this.editor as any, parentNode as any)
        : at;
      const isActive = !!(node as any)?.[this.key];

      if (isActive) {
        Transforms.unwrapNodes(this.editor, { at });
      } else {
        Transforms.wrapNodes(
          this.editor,
          {
            [this.key]: true,
            children: [],
          },
          { at }
        );
      }
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, { isActive });
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children } = context;
    return <div className={styles[`${classNamePrefix}`]}>{children}</div>;
  }
}

export const quoteBlockPlugin = new QuoteBlockPlugin();
