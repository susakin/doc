import { useEffect, useState } from "react";
import { lineThroughPlugin, LINETHROUGH_KEY } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useLineThrough = () => {
  const [lineThrough, setLineThrough] = useState<ActiveChangePayload>(
    lineThroughPlugin.getCurrentStatus()
  );

  useEffect(() => {
    lineThroughPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setLineThrough(payload);
    });
  }, []);

  const commandLineThrough = () => {
    lineThroughPlugin.onCommand({ lineThrough: LINETHROUGH_KEY });
  };

  return { lineThrough, commandLineThrough };
};
