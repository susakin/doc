import { useEffect, useState } from "react";
import { alignPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useAlign = () => {
  const [align, setAlign] = useState<PluginActiveChangePayload>(
    alignPlugin.getCurrentStatus()
  );

  useEffect(() => {
    alignPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (align) => {
      setAlign(align);
    });
  }, []);

  const commandAlign = ({ align }: any) => {
    alignPlugin.onCommand({ align });
  };

  return { align, commandAlign };
};
