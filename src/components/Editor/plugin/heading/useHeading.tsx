import { useEffect, useState } from "react";
import { Heading, headingPlugin } from ".";
import { PluginActiveChangePayload, EDITOR_EVENT } from "../../event/action";

export const useHeading = () => {
  const [heading, setHeading] = useState<PluginActiveChangePayload>(
    headingPlugin.getCurrentStatus()
  );

  useEffect(() => {
    headingPlugin.event.on(EDITOR_EVENT.PLUGIN_ACTIVE_CHANGE, (payload) => {
      setHeading(payload);
    });
  }, []);

  const commandHeading = ({ heading }: any) => {
    headingPlugin.onCommand({ heading });
  };

  const insertNodeAfterSelectedElement = (heading: Heading) => {
    headingPlugin.insertNodeAfterSelectedElement(heading, {
      placeholder: heading,
    });
  };

  return { heading, commandHeading, insertNodeAfterSelectedElement };
};
