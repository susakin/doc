import { useEffect, useState } from "react";
import { headingPlugin } from ".";
import { ElementChangePayload, EDITOR_EVENT } from "../../event/action";

export const useAlign = () => {
  const [heading, setHeading] = useState<ElementChangePayload>();

  useEffect(() => {
    headingPlugin.event.on(EDITOR_EVENT.ELEMENT_CHANGE, (payload) => {
      setHeading(payload);
    });
  }, []);

  return { heading };
};
