import { useEffect, useState } from "react";
import { quoteBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useQuoteBlock = () => {
  const [quoteBlock, setQuoteBlock] = useState<PluginActiveChangePayload>(
    quoteBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    quoteBlockPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setQuoteBlock(payload);
    });
  }, []);

  const commandQuoteBlock = () => {
    quoteBlockPlugin.onCommand(undefined as any);
  };

  return { quoteBlock, commandQuoteBlock };
};
