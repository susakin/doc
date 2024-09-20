import { useEffect, useState } from "react";
import { highlightBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useHighlightBlock = () => {
  const [highlightBlock, setHighlightBlock] = useState<ActiveChangePayload>();

  useEffect(() => {
    highlightBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setHighlightBlock(payload);
    });
  }, []);

  return { highlightBlock };
};
