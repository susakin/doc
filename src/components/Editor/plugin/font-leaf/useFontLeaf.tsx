import { useEffect, useState } from "react";
import { fontLeafPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontLeaf = () => {
  const [fontLeaf, setFontLeaf] = useState<ActiveChangePayload>(
    fontLeafPlugin.getCurrentStatus()?.fontLeaf
  );
  useEffect(() => {
    fontLeafPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setFontLeaf(payload?.fontLeaf);
    });
  }, []);

  const commandFontLeaf = (fontLeaf: Record<string, any>) => {
    fontLeafPlugin.onCommand({ fontLeaf });
  };

  return { fontLeaf, commandFontLeaf };
};
