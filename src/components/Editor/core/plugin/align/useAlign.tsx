import { useEffect, useState } from "react";
import { alignPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useAlign = () => {
  const [alignActive, setAlignActive] = useState<ActiveChangePayload>();

  useEffect(() => {
    alignPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setAlignActive(payload);
    });
  }, []);

  return { alignActive };
};
