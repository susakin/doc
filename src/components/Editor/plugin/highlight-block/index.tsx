import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { getAttributeAtCursor } from "../../utils";
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
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const highlightBlock = getAttributeAtCursor(
        this.editor,
        HIGHLIGHT_BLOCK_KEY
      );
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, {
        isActive: !!highlightBlock,
        highlightBlock,
      });
    });
  }

  public match({ element }: RenderElementProps): boolean {
    return !!element[HIGHLIGHT_BLOCK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onCommand: CommandFn = ({ highlightBlock, at }) => {
    if (this.editor) {
      console.log(at, "at");
      Transforms.setNodes(
        this.editor,
        {
          [HIGHLIGHT_BLOCK_KEY]: highlightBlock,
        },
        { at }
      );
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
