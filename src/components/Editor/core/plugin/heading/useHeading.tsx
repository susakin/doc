import { useEffect, useState } from "react";
import { headingPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useAlign = () => {
  const [headingActive, setHeadingActive] = useState<ActiveChangePayload>();

  useEffect(() => {
    headingPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setHeadingActive(payload);
    });
  }, []);

  return { headingActive };
};
