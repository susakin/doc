import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { EDITOR_EVENT } from "../../event/action";
import Divider from "./Divider";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";

export const DIVIDER_BLOCK_KEY = "divider-block";

export class DividerBlockPlugin extends BlockPlugin {
  public readonly key: string = DIVIDER_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const dividerBlock = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!dividerBlock,
        dividerBlock,
      });
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    const hotkey = "Ctrl+Alt+S";
    if (isHotkey(hotkey, event.nativeEvent)) {
      event.preventDefault();
      this.onCommand(undefined as any);
    }
  };

  public match({ element }: RenderElementProps): boolean {
    return !!element[DIVIDER_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public getCurrentStatus = () => {
    const dividerBlock = (this.selectedElement as any)?.[this.key];
    return {
      isActive: !!dividerBlock,
      dividerBlock,
    };
  };

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const isActive = (this.selectedElement as any)?.[this.key] === true;
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.insertNodes(
        this.editor,
        {
          [this.key]: isActive ? undefined : true,
          children: [{ text: "" }],
        },
        { at }
      );
    }
  };

  public render(): JSX.Element {
    return <Divider />;
  }
}

export const dividerBlockPlugin = new DividerBlockPlugin();
