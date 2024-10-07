import { useEffect, useState } from "react";
import { Heading, headingPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useHeading = () => {
  const [heading, setHeading] = useState<ActiveChangePayload>(
    headingPlugin.getCurrentStatus()
  );

  useEffect(() => {
    headingPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setHeading(payload);
    });
  }, []);

  const commandHeading = (heading: Heading) => {
    headingPlugin.onCommand({ heading });
  };

  return { heading, commandHeading };
};
