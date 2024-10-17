import { useEffect, useState } from "react";
import { fontBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontBlock = () => {
  const [fontBlock, setFontBlock] = useState<PluginActiveChangePayload>(
    fontBlockPlugin.getCurrentStatus()
  );

  useEffect(() => {
    fontBlockPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setFontBlock(payload);
    });
  }, []);

  const commandFontBlock = ({ fontBlock }: any) => {
    fontBlockPlugin.onCommand({ fontBlock });
  };

  return { fontBlock, commandFontBlock };
};
