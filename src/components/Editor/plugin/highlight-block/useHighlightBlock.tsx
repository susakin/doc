import { useEffect, useState } from "react";
import { highlightBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { Editor } from "slate";
import { getSelectionAbovePath } from "../../utils";

export const useHighlightBlock = () => {
  const [highlightBlock, setHighlightBlock] =
    useState<PluginActiveChangePayload>(
      highlightBlockPlugin.getCurrentStatus()
    );

  useEffect(() => {
    highlightBlockPlugin.event.on(
      EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE,
      (payload) => {
        setHighlightBlock(payload);
      }
    );
  }, []);

  const commandHighlightBlock = ({ highlightBlock, at }: any) => {
    if (!at) {
      const editor = highlightBlockPlugin.editor;
      at = getSelectionAbovePath(editor);
    }
    highlightBlockPlugin.onCommand({
      highlightBlock,
      at,
    });
  };

  return { highlightBlock, commandHighlightBlock };
};
