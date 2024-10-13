import { useEffect, useState } from "react";
import { italicPlugin, ITALIC_KEY } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useItalic = () => {
  const [italic, setItalic] = useState<PluginActiveChangePayload>(
    italicPlugin.getCurrentStatus()
  );

  useEffect(() => {
    italicPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setItalic(payload);
    });
  }, []);

  const commandItalic = () => {
    italicPlugin.onCommand({ italic: ITALIC_KEY });
  };

  return { italic, commandItalic };
};
