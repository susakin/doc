import { ReactEditor, RenderElementProps } from "slate-react";
import { BlockContext, BlockPlugin, CommandFn } from "../base";
import { Transforms } from "slate";
import { EDITOR_EVENT } from "../../event/action";
import Highlight from "./Highligth";
import { useHasSelection } from "../../components/HoverToolbar";
import { getParentNodeByKey } from "../../utils/slateHelper";

export const HIGHLIGHT_BLOCK_KEY = "highlight-block";

export class HighlightBlockPlugin extends BlockPlugin {
  public readonly key: string = HIGHLIGHT_BLOCK_KEY;
  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTED_ELEMENT_CHANGE, (element) => {
      const at = ReactEditor.findPath(this.editor as any, element as any);
      const parentNode = getParentNodeByKey(this.editor as any, at, this.key);
      const node = parentNode ?? element;

      const highlightBlock = (node as any)?.[this.key];
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!highlightBlock,
        highlightBlock,
      });
    });
  }

  public getCurrentStatus = () => {
    const element = this.selectedElement;
    const at = ReactEditor.findPath(this.editor as any, element as any);
    const parentNode = getParentNodeByKey(this.editor as any, at, this.key);
    const node = parentNode ?? element;

    const highlightBlock = (node as any)?.[this.key];
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
      let at = ReactEditor.findPath(
        this.editor as any,
        this.selectedElement as any
      );
      const parentNode = getParentNodeByKey(this.editor as any, at, this.key);
      const node = parentNode ?? this.selectedElement;
      at = parentNode
        ? ReactEditor.findPath(this.editor as any, parentNode as any)
        : at;

      const highlight = (node as any)?.[HIGHLIGHT_BLOCK_KEY];

      if (!highlightBlock) {
        Transforms.unwrapNodes(this.editor, { at });
      } else {
        if (highlight) {
          Transforms.setNodes(
            this.editor,
            {
              [this.key]: highlightBlock,
            },
            {
              at,
              split: true,
            }
          );
        } else {
          Transforms.wrapNodes(
            this.editor,
            {
              [this.key]: highlightBlock,
              children: [],
            },
            { at, split: true }
          );
        }
      }

      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, {
        isActive: !!highlightBlock,
        highlightBlock,
      });
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
