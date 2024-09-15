import { useEffect, useState } from "react";
import { quotePlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useQuoteBlock = () => {
  const [quoteBlock, setQuoteBlock] = useState<ActiveChangePayload>();

  useEffect(() => {
    quotePlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setQuoteBlock(payload);
    });
  }, []);

  return { quoteBlock };
};
