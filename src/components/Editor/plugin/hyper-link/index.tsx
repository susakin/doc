import { ReactEditor, RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";
import renderToContainer from "../../utils/renderToContainer";
import InlinePopover from "../../components/Tooltip/InlinePopover";
import AnimationWrapper from "../../components/Tooltip/AnimationWrapper";
import LinkEditPanel from "../../components/Link/LinkEditPanel";
import { mockSelectionPlugin } from "../mock-selection";
import HyperLink from "./HyperLink";
import { BaseText, Editor, Transforms } from "slate";
import { getMarkByFormat, isText } from "../../utils/slateHelper";

export const HYPER_LINK_KEY = "hyper-link";

const HOTKEYS: Record<string, string> = {
  "ctrl+k": HYPER_LINK_KEY,
};

export type HyperLinkConfig = {
  url?: string;
  text?: string;
  displayMode?: "link" | "title";
};

export class HyperLinkPlugin extends LeafPlugin {
  public readonly key: string = HYPER_LINK_KEY;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.event.on(EDITOR_EVENT.SELECTION_CHANGE, () => {
      const hyperLink = getMarkByFormat(this.editor as any, HYPER_LINK_KEY);
      const payload = {
        isActive: !!hyperLink,
        hyperLink,
      };
      this.event.trigger(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, payload);
    });
    this.event.on(REACT_EVENTS.KEY_DOWN, this.onKeyDown);
  }

  public getCurrentStatus = () => {
    const hyperLink = getMarkByFormat(this.editor as any, HYPER_LINK_KEY);
    return {
      isActive: !!hyperLink,
      hyperLink,
    };
  };

  public match(props: RenderLeafProps): boolean {
    return !!props.leaf[HYPER_LINK_KEY];
  }

  public destroy?: (() => void) | undefined;

  public onKeyDown = (event: ReactEventMap["react_keydown"]) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event.nativeEvent)) {
        event.preventDefault();
        this.onCommand(null as any);
      }
    }
  };

  public onEditLink({ url, text }: HyperLinkConfig) {
    const editor = this.editor as any;
    const path = ReactEditor.findPath(editor, mockSelectionPlugin.element);
    Transforms.setNodes(
      editor,
      {
        [this.key]: {
          url,
          displayMode: "title",
        },
      },
      {
        match: isText,
        split: true,
        at: path,
      }
    );
    if (text) {
      const range = Editor.range(editor, path);
      Transforms.insertText(editor, text, { at: range });
    }

    const end = Editor.end(editor, path);
    Transforms.select(editor, end);
    setTimeout(() => {
      //聚焦到设置文本的 末尾
      ReactEditor.focus(this.editor as ReactEditor);
    });

    mockSelectionPlugin.onCommand({
      isActive: false,
    });
  }

  public onCommand: CommandFn = () => {
    const editor = this.editor as any;
    if (editor) {
      const { selection } = editor;
      mockSelectionPlugin.onCommand({
        isActive: true,
        location: selection,
      });
      this.event.trigger(EDITOR_EVENT.PLUGIN_COMMANT, null as any);

      Promise.resolve().then(() => {
        const unmount = renderToContainer(
          <InlinePopover
            renderToBody
            offset={5}
            onOpenChange={(open) => {
              if (open === false) {
                Promise.resolve().then(() => {
                  mockSelectionPlugin.onCommand({
                    isActive: false,
                  });
                });
                unmount();
              }
            }}
            placement="bottom-start"
            content={({ side }) => (
              <AnimationWrapper side={side}>
                <LinkEditPanel
                  onOk={({ url }) => {
                    this.onEditLink({ url });
                    unmount();
                  }}
                />
              </AnimationWrapper>
            )}
          />
        );
      });
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children, props, element } = context;
    const config = { ...props.leaf[HYPER_LINK_KEY] };
    config.text = element?.text;
    if (config.displayMode === "link") {
      config.url = element?.text;
    }
    return (
      <HyperLink
        config={config}
        readonly={this.readonly}
        onRemoveLink={() => {
          this.removeLink(element);
        }}
        onOk={this.onEditLink.bind(this)}
        onSwitchDisplayMode={(displayMode) => {
          const editor = this.editor as any;
          const path = ReactEditor.findPath(editor, element);

          Transforms.setNodes(
            this.editor as any,
            {
              [this.key]: {
                ...config,
                displayMode,
              },
            },
            {
              at: path,
              match: isText,
              split: true,
            }
          );
          const range = Editor.range(editor, path);
          Transforms.insertText(
            editor,
            displayMode === "link"
              ? config?.url
              : (new URL(config?.text as any)?.hostname as any),
            { at: range }
          );
        }}
      >
        {children}
      </HyperLink>
    );
  }
  public removeLink(element: BaseText) {
    const path = ReactEditor.findPath(this.editor as any, element);
    Transforms.unsetNodes(this.editor as any, [this.key], {
      match: isText,
      split: true,
      at: path,
    });
  }
}

export const hyperLinkPlugin = new HyperLinkPlugin();
