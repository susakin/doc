import { useEffect, useState } from "react";
import { highlightBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

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

  const commandHighlightBlock = ({ highlightBlock }: any) => {
    highlightBlockPlugin.onCommand({
      highlightBlock,
    });
  };

  return { highlightBlock, commandHighlightBlock };
};
