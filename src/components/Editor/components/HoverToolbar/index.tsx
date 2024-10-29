import React, { useEffect, useState } from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import Menu from "./Menu";
import AnimationWrapper from "../Tooltip/AnimationWrapper";
import InlinePopover from "../Tooltip/InlinePopover";
import { HYPER_LINK_KEY, hyperLinkPlugin } from "../../plugin/hyper-link";
import { EDITOR_EVENT } from "../../event/action";
import { pluginController } from "../../plugin/base/controller";
import { HEADER_TITLE_KEY } from "../../plugin/header-title-block";
import HeaderTitleMenu from "../HeaderTitleMenu";

export const useHasSelection = () => {
  const editor = useSlate();
  const inFocus = useFocused();
  const { selection } = editor;

  return !(
    !selection ||
    !inFocus ||
    Range.isCollapsed(selection) ||
    Editor.string(editor, selection) === ""
  );
};

type HoverToolbarProps = {
  editorMouseDown?: boolean;
};

const HoverToolbar: React.FC<HoverToolbarProps> = ({ editorMouseDown }) => {
  const hasSection = useHasSelection();
  const active = !hasSection || editorMouseDown;
  const inHeaderTitle = pluginController.selectedElement?.[HEADER_TITLE_KEY];

  if (active) {
    pluginController.event.trigger(EDITOR_EVENT.HOVER_MENU_ACTIVE, false);
    return null;
  }

  useEffect(() => {
    const onCommant = () => {
      setOpen(false);
    };
    hyperLinkPlugin.event.on(EDITOR_EVENT.PLUGIN_COMMANT, onCommant);

    return () => {
      hyperLinkPlugin.event.off(EDITOR_EVENT.PLUGIN_COMMANT, onCommant);
    };
  }, []);

  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    pluginController.event.trigger(EDITOR_EVENT.HOVER_MENU_ACTIVE, !!open);
  }, [open]);

  return (
    <InlinePopover
      offset={10}
      renderToBody
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      randomKey={`${Date.now()}`}
      placement="top"
      content={({ side }) => (
        <AnimationWrapper side={side}>
          {inHeaderTitle ? (
            <HeaderTitleMenu />
          ) : (
            <Menu
              onClick={(e, item) => {
                if (item.key === HYPER_LINK_KEY) {
                  setOpen(false);
                }
              }}
            />
          )}
        </AnimationWrapper>
      )}
    />
  );
};

export default HoverToolbar;
