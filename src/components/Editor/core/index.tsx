import {
  Editable as SlateEditable,
  withReact,
  useSlate,
  Slate,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import styles from "./index.module.less";
import { EDITOR_EVENT } from "./event/action";
import { REACT_EVENTS } from "./event/react";
import { pluginController } from "./plugin/base/controller";
import { alignPlugin, boldPlugin, headingPlugin } from "./plugin";
import { italicPlugin } from "./plugin/italic";
import { underLinePlugin } from "./plugin/under-line";
import { lineThroughPlugin } from "./plugin/line-through";

const classNamePrefix = "editor";
const INIT_NODE = [{ children: [{ text: "" }] }];

type EditorProps = {
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
} & EditableProps;

type EditableProps = {
  placeholder?: string;
};

const Editable: React.FC<EditableProps> = ({ placeholder }) => {
  const baseEditor = useSlate();

  useEffect(() => {
    pluginController.event.trigger(EDITOR_EVENT.EDITOR_CHANGE, baseEditor);
  }, [baseEditor]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      pluginController.event.trigger(REACT_EVENTS.KEY_DOWN, event);
    },
    []
  );
  return (
    <SlateEditable
      className={styles[`${classNamePrefix}`]}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      renderElement={pluginController.renderElement}
      renderLeaf={pluginController.renderLeaf}
    />
  );
};

const Editor: React.FC<EditorProps> = ({ onChange, initialValue, ...rest }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  //插件注册
  useLayoutEffect(() => {
    pluginController.register(
      alignPlugin,
      headingPlugin,
      boldPlugin,
      italicPlugin,
      underLinePlugin,
      lineThroughPlugin
    );
    pluginController.apply();

    return () => {
      //pluginController.destroy();
    };
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue || INIT_NODE}
      onChange={onChange}
    >
      <Editable {...rest} />
    </Slate>
  );
};

export default Editor;
