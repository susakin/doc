import { RenderLeafProps } from "slate-react";
import { LeafPlugin, CommandFn, LeafContext } from "../base";
import { REACT_EVENTS, ReactEventMap } from "../../event/react";
import { getMarkByFormat } from "../../utils";
import { EDITOR_EVENT } from "../../event/action";
import { isHotkey } from "../../utils/isHotkey";
import renderToContainer from "../../utils/renderToContainer";
import InlinePopover from "../../components/Tooltip/InlinePopover";
import AnimationWrapper from "../../components/Tooltip/AnimationWrapper";
import LinkEditPanel from "../../components/Link/LinkEditPanel";

export const HYPER_LINK_KEY = "hyper-link";

const HOTKEYS: Record<string, string> = {
  "ctrl+k": HYPER_LINK_KEY,
};

export type HyperLink = {
  link?: string;
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
      this.event.trigger(EDITOR_EVENT.ACTIVE_CHANGE, payload);
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

  public onCommand: CommandFn = () => {
    if (this.editor) {
      this.event.trigger(EDITOR_EVENT.PLUGIN_COMMANT, null as any);
      const unmount = renderToContainer(
        <InlinePopover
          renderToBody
          offset={5}
          onOpenChange={(open) => {
            open === false && unmount();
          }}
          placement="bottom-start"
          content={({ side }) => (
            <AnimationWrapper side={side}>
              <LinkEditPanel />
            </AnimationWrapper>
          )}
        />
      );
    }
  };

  public render(context: LeafContext): JSX.Element {
    const { children } = context;
    return <strong style={{ fontWeight: "bold" }}>{children}</strong>;
  }
}

export const hyperLinkPlugin = new HyperLinkPlugin();
