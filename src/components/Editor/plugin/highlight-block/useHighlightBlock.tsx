import { useEffect, useState } from "react";
import { highlightBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { defaultColorSetting } from "../../components/ColorPicker";

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

  const insertNodeAfterSelectedElement = () => {
    highlightBlockPlugin.insertNodeAfterSelectedElement(defaultColorSetting);
  };

  return {
    highlightBlock,
    commandHighlightBlock,
    insertNodeAfterSelectedElement,
  };
};
