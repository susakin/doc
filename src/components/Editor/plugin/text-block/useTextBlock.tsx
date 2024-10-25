import { useEffect, useState } from "react";
import { textBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useTextBlock = () => {
  const [textBlock, setTextBlock] = useState<PluginActiveChangePayload>(
    textBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    textBlockPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setTextBlock(payload);
    });
  }, []);

  const commandTextBlock = () => {
    textBlockPlugin.onCommand(undefined as any);
  };

  const insertNodeAfterSelectedElement = (textBlock: boolean | undefined) => {
    textBlockPlugin.insertNodeAfterSelectedElement(textBlock);
  };

  return { textBlock, commandTextBlock, insertNodeAfterSelectedElement };
};
