import { useEffect, useState } from "react";
import { quoteBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useQuoteBlock = () => {
  const [quoteBlock, setQuoteBlock] = useState<ActiveChangePayload>(
    quoteBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    quoteBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setQuoteBlock(payload);
    });
  }, []);

  const commandQuoteBlock = () => {
    quoteBlockPlugin.onCommand(undefined as any);
  };

  return { quoteBlock, commandQuoteBlock };
};
