import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { EDITOR_EVENT } from "../../event/action";
import Highlight from "./Highligth";
import { useHasSelection } from "../../components/HoverToolbar";

export const HIGHLIGHT_BLOCK_KEY = "highlight-block";

export class HighlightBlockPlugin extends BlockPlugin {
  public readonly key: string = HIGHLIGHT_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const highlightBlock = (element as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!highlightBlock,
        highlightBlock,
      });
    });
  }

  public getCurrentStatus = () => {
    const highlightBlock = (this.selectedElement as any)?.[this.key];
    return {
      isActive: !!highlightBlock,
      highlightBlock,
    };
  };

  public match({ element }: RenderElementProps): boolean {
    return !!element[HIGHLIGHT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = ({ highlightBlock }) => {
    if (this.editor) {
      const at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      Transforms.setNodes(
        this.editor,
        {
          [HIGHLIGHT_BLOCK_KEY]: highlightBlock,
        },
        { at }
      );
      this.event.trigger(EDITOR_EVENT.SELECTION_CHANGE, this.editor.selection);
    }
  };

  public renderLine(context: BlockContext): JSX.Element {
    const { children, element } = context;
    const highlightBlock = element[HIGHLIGHT_BLOCK_KEY];
    const hasSection = useHasSelection();
    return (
      <Highlight
        value={highlightBlock as any}
        readonly={this.readonly || hasSection}
        onChange={(highlightBlock) => {
          this.onCommand({
            highlightBlock,
            at: ReactEditor.findPath(this.editor as any, element),
          });
        }}
      >
        {children}
      </Highlight>
    );
  }
}

export const highlightBlockPlugin = new HighlightBlockPlugin();
