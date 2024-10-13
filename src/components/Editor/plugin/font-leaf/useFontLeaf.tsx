import { useEffect, useState } from "react";
import { fontLeafPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontLeaf = () => {
  const [fontLeaf, setFontLeaf] = useState<PluginActiveChangePayload>(
    fontLeafPlugin.getCurrentStatus()?.fontLeaf
  );
  useEffect(() => {
    fontLeafPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setFontLeaf(payload?.fontLeaf);
    });
  }, []);

  const commandFontLeaf = (fontLeaf: Record<string, any>) => {
    fontLeafPlugin.onCommand({ fontLeaf });
  };

  return { fontLeaf, commandFontLeaf };
};
