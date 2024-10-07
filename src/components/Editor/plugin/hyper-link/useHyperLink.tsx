import { useLayoutEffect, useState } from "react";
import { hyperLinkPlugin } from ".";
import { ActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useHyperLink = () => {
  const [hyperLink, setHyperLink] = useState<ActiveChangePayload>(
    hyperLinkPlugin.getCurrentStatus()
  );
  useLayoutEffect(() => {
    hyperLinkPlugin.event.on(EDITOR_EVENT.ACTIVE_CHANGE, (payload) => {
      setHyperLink(payload);
    });
  }, []);

  const commandHyperLink = () => {
    hyperLinkPlugin.onCommand(undefined as any);
  };

  return { hyperLink, commandHyperLink };
};
