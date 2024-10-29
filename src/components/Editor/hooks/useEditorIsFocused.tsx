import { useEffect, useState } from "react";
import { pluginController } from "../plugin/base/controller";
import { EDITOR_EVENT } from "../event/action";

export const useEditorIsfoucesed = () => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const onBlur = () => {
      setIsFocused(false);
    };
    const onFocus = () => {
      setIsFocused(true);
    };

    pluginController.event.on(EDITOR_EVENT.BLUR, onBlur);
    pluginController.event.on(EDITOR_EVENT.FOCUS, onFocus);

    return () => {
      pluginController.event.off(EDITOR_EVENT.BLUR, onBlur);
      pluginController.event.off(EDITOR_EVENT.FOCUS, onFocus);
    };
  }, []);

  return { isFocused };
};
