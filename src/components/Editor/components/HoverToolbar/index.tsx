import React, { useEffect, useState } from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import Menu from "./Menu";
import AnimationWrapper from "../Tooltip/AnimationWrapper";
import InlinePopover from "../Tooltip/InlinePopover";
import { HYPER_LINK_KEY, hyperLinkPlugin } from "../../plugin/hyper-link";
import { EDITOR_EVENT } from "../../event/action";

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

  if (!hasSection || editorMouseDown) {
    return null;
  }

  useEffect(() => {
    hyperLinkPlugin.event.on(EDITOR_EVENT.PLUGIN_COMMANT, () => {
      setOpen(false);
    });
  }, []);

  const [open, setOpen] = useState<boolean | undefined>(undefined);

  return (
    <InlinePopover
      offset={10}
      renderToBody
      open={open}
      randomKey={`${Date.now()}`}
      placement="top"
      content={({ side }) => (
        <AnimationWrapper side={side}>
          <Menu
            onClick={(e, item) => {
              if (item.key === HYPER_LINK_KEY) {
                setOpen(false);
              }
            }}
          />
        </AnimationWrapper>
      )}
    />
  );
};

export default HoverToolbar;
