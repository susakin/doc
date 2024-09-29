import { useEffect, useState } from "react";
import { quoteBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useQuoteBlock = () => {
  const [quoteBlock, setQuoteBlock] = useState<ActiveChangePayload>();

  useEffect(() => {
    quoteBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setQuoteBlock(payload);
    });
  }, []);

  return { quoteBlock };
};
