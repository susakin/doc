import { useEffect, useState } from "react";
import { alignPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useAlign = () => {
  const [align, setAlign] = useState<ActiveChangePayload>();

  useEffect(() => {
    alignPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setAlign(payload);
    });
  }, []);

  return { align };
};
