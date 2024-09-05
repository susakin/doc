import { useEffect, useState } from "react";
import { boldPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useBold = () => {
  const [boldActive, setBoldActive] = useState<ActiveChangePayload>();

  useEffect(() => {
    boldPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setBoldActive(payload);
    });
  }, []);

  return { boldActive };
};
