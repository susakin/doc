import { useEffect, useState } from "react";
import { textBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useTextBlock = () => {
  const [textBlock, setTextBlock] = useState<ActiveChangePayload>();

  useEffect(() => {
    textBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setTextBlock(payload);
    });
  }, []);

  return { textBlock };
};
