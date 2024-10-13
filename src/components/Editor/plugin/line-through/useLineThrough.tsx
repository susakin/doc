import { useEffect, useState } from "react";
import { lineThroughPlugin, LINETHROUGH_KEY } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useLineThrough = () => {
  const [lineThrough, setLineThrough] = useState<PluginActiveChangePayload>(
    lineThroughPlugin.getCurrentStatus()
  );

  useEffect(() => {
    lineThroughPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setLineThrough(payload);
    });
  }, []);

  const commandLineThrough = () => {
    lineThroughPlugin.onCommand({ lineThrough: LINETHROUGH_KEY });
  };

  return { lineThrough, commandLineThrough };
};
