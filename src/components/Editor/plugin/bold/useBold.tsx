import { useLayoutEffect, useState } from "react";
import { boldPlugin, BOLD_KEY } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useBold = () => {
  const [bold, setBold] = useState<PluginActiveChangePayload>(
    boldPlugin.getCurrentStatus()
  );
  useLayoutEffect(() => {
    boldPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setBold(payload);
    });
  }, []);

  const commandBold = () => {
    boldPlugin.onCommand({ bold: BOLD_KEY });
  };

  return { bold, commandBold };
};
