import { useEffect, useState } from "react";
import { fontBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useFontBlock = () => {
  const [fontBlock, setFontBlock] = useState<PluginActiveChangePayload>();

  useEffect(() => {
    fontBlockPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setFontBlock(payload);
    });
  }, []);

  const commandFontBlock = ({ fontBlock, at }: any) => {
    fontBlockPlugin.onCommand({ fontBlock, at });
  };

  return { fontBlock, commandFontBlock };
};
