import { useEffect, useState } from "react";
import { underLinePlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useUnderLine = () => {
  const [underLine, setUnderLine] = useState<PluginActiveChangePayload>(
    underLinePlugin.getCurrentStatus()
  );

  useEffect(() => {
    underLinePlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setUnderLine(payload);
    });
  }, []);

  const commandUnderLine = () => {
    underLinePlugin.onCommand({ underLine: underLinePlugin.key });
  };

  return { underLine, commandUnderLine };
};
