import { useEffect, useState } from "react";
import { textBlockPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useTextBlock = () => {
  const [textBlock, setTextBlock] = useState<ActiveChangePayload>(
    textBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    textBlockPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setTextBlock(payload);
    });
  }, []);

  const commandTextBlock = (at?: any) => {
    if (!at) {
      const editor = textBlockPlugin.editor;
      at = getSelectionAbovePath(editor);
    }
    textBlockPlugin.onCommand({ at } as any);
  };

  return { textBlock, commandTextBlock };
};
