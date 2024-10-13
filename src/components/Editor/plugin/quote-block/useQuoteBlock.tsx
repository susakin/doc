import { useEffect, useState } from "react";
import { quoteBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useQuoteBlock = () => {
  const [quoteBlock, setQuoteBlock] = useState<PluginActiveChangePayload>(
    quoteBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    quoteBlockPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setQuoteBlock(payload);
    });
  }, []);

  const commandQuoteBlock = (at?: any) => {
    if (!at) {
      const editor = quoteBlockPlugin.editor;
      at = getSelectionAbovePath(editor);
    }
    quoteBlockPlugin.onCommand({ at } as any);
  };

  return { quoteBlock, commandQuoteBlock };
};
