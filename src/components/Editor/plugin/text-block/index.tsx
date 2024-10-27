import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockPlugin, CommandFn, BlockContext } from "../base";
import { Transforms } from "slate";
import { EDITOR_EVENT } from "../../event/action";
import { HEADING_KEY, headingPlugin } from "../heading";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { isHotkey } from "../../utils/isHotkey";
import BlockPlaceholder from "../../components/Block/BlockPlaceholder";

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
      const heading = (element as any)?.[HEADING_KEY];

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!textBlock || !heading,
        textBlock,
      });
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    const hotkey = "ctrl+alt+0";
    if (isHotkey(hotkey, event.nativeEvent)) {
      event.preventDefault();
      this.onCommand(undefined as any);
    }
  };

  public getCurrentStatus = () => {
    const textBlock = (this.selectedElement as any)?.[this.key];
    const heading = (this.selectedElement as any)?.[HEADING_KEY];
    return {
      isActive: !!textBlock || !heading,
      textBlock,
    };
  };

  public match(props: RenderElementProps): boolean {
    return !!props.element[TEXT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = () => {
    if (this.editor) {
      const isActive = (this.selectedElement as any)?.[this.key] === true;
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );

      Transforms.setNodes(
        this.editor,
        Object.assign(
          {
            [this.key]: isActive ? undefined : true,
          },
          !isActive ? { [HEADING_KEY]: undefined, placeholder: undefined } : {}
        ),
        {
          at,
        }
      );
      this.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor?.selection as any
      );
      headingPlugin.event.trigger(
        EDITOR_EVENT.SELECTION_CHANGE,
        this.editor?.selection as any
      );
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
