import { useLayoutEffect, useState } from "react";
import { hyperLinkPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useHyperLink = () => {
  const [hyperLink, setHyperLink] = useState<PluginActiveChangePayload>(
    hyperLinkPlugin.getCurrentStatus()
  );
  useLayoutEffect(() => {
    hyperLinkPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setHyperLink(payload);
    });
  }, []);

  const commandHyperLink = () => {
    hyperLinkPlugin.onCommand(undefined as any);
  };

  return { hyperLink, commandHyperLink };
};
