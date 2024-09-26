import { useEffect, useState } from "react";
import { alignPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useAlign = () => {
  const [align, setAlign] = useState<ActiveChangePayload>(
    alignPlugin.getCurrentStatus()
  );

  useEffect(() => {
    alignPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (align) => {
      setAlign(align);
    });
  }, []);

  const commandAlign = (align: string) => {
    alignPlugin.onCommand({ align });
  };

  return { align, commandAlign };
};
