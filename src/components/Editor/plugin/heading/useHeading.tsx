import { useEffect, useState } from "react";
import { headingPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";
import { getSelectionAbovePath } from "../../utils";

export const useHeading = () => {
  const [heading, setHeading] = useState<PluginActiveChangePayload>(
    headingPlugin.getCurrentStatus()
  );

  useEffect(() => {
    headingPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setHeading(payload);
    });
  }, []);

  const commandHeading = ({ heading }: any) => {
    headingPlugin.onCommand({ heading });
  };

  return { heading, commandHeading };
};
