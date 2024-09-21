import { useLayoutEffect, useState } from "react";
import { boldPlugin, BOLD_KEY } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useBold = () => {
  const [bold, setBold] = useState<ActiveChangePayload>(
    boldPlugin.status as any
  );

  useLayoutEffect(() => {
    boldPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setBold(payload);
    });
  }, []);

  const commandBold = () => {
    boldPlugin.onCommand({ bold: BOLD_KEY });
  };

  return { bold, commandBold };
};
