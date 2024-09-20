import { useEffect, useState } from "react";
import { boldPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useBold = () => {
  const [bold, setBold] = useState<ActiveChangePayload>();

  useEffect(() => {
    boldPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setBold(payload);
    });
  }, []);

  return { bold };
};
