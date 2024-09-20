import React from "react";
import { useFocused, useSlate } from "slate-react";
import { Editor, Range } from "slate";
import Popover from "../Tooltip/Popover";
import InlineMenu from "../InlineMenu";

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

const HoverToolbar: React.FC = () => {
  const hasSection = useHasSelection();

  if (!hasSection) {
    return null;
  }

  const domSelection = window.getSelection();
  const domRange = domSelection?.getRangeAt(0);

  console.log(domRange, "domRange");

  return <Popover domRange={domRange} content={<InlineMenu />} />;
};

export default HoverToolbar;
