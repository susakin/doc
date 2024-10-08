import { useEffect, useState } from "react";
import { quoteBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useQuoteBlock = () => {
  const [quoteBlock, setQuoteBlock] = useState<ActiveChangePayload>(
    quoteBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    quoteBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
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
