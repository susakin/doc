import { useEffect, useState } from "react";
import { textBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useTextBlock = () => {
  const [textBlock, setTextBlock] = useState<ActiveChangePayload>(
    textBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    textBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setTextBlock(payload);
    });
  }, []);

  const commandTextBlock = () => {
    textBlockPlugin.onCommand(undefined as any);
  };

  return { textBlock, commandTextBlock };
};
