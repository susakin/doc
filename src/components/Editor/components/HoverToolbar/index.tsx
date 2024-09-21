import React from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import Menu from "./Menu";
import AnimationWrapper from "../Tooltip/AnimationWrapper";
import InlinePopover from "../Tooltip/InlinePopover";

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

  const domSelection = window.getSelection();
  const domRange = domSelection?.getRangeAt?.(0);
  return (
    <InlinePopover
      domRange={domRange}
      offset={10}
      renderToBody
      placement="top"
      content={({ side }) => (
        <AnimationWrapper side={side}>
          <Menu />
        </AnimationWrapper>
      )}
    />
  );
};

export default HoverToolbar;
