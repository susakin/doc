import { useEffect, useState } from "react";
import { dividerBlockPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useDividerBlock = () => {
  const [dividerBlock, setDividerBlock] = useState<PluginActiveChangePayload>();

  useEffect(() => {
    dividerBlockPlugin.event.on(
      EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE,
      (payload) => {
        setDividerBlock(payload);
      }
    );
  }, []);

  return { dividerBlock };
};
