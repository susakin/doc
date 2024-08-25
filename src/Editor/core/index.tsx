import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import {
  Editor as SlateEditor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { useCallback, useMemo } from "react";
import { EditorPlugin, PLUGIN_TYPE } from "./plugin";

type EditorProps = {
  initialValue?: Descendant[];
  placeholder?: string;
  onChange?: (value: Descendant[]) => void;
  plugins?: EditorPlugin[];
};

const Editor: React.FC<EditorProps> = ({
  placeholder,
  onChange,
  plugins,
  ...rest
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue = useMemo(() => {
    return rest?.initialValue || [];
  }, [rest?.initialValue]);

  const renderElement = useCallback(
    (props: RenderElementProps) => {
      return (
        <>
          {plugins
            ?.filter((item) => item.type === PLUGIN_TYPE.BLOCK)
            ?.map((item) => {
              const match = item.match(props);
              if (match) {
                return item.render?.(props);
              }
              return null;
            })}
        </>
      );
    },
    [plugins]
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => {
      return (
        <>
          {plugins
            ?.filter((item) => item.type === PLUGIN_TYPE.INLINE)
            ?.map((item) => {
              const match = item.match(props);
              if (match) {
                return item.render?.(props);
              }
              return null;
            })}
        </>
      );
    },
    [plugins]
  );

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Editable
        placeholder={placeholder}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          // for (const hotkey in HOTKEYS) {
          //   if (isHotkey(hotkey, event as any)) {
          //     event.preventDefault();
          //     const mark = HOTKEYS[hotkey];
          //     toggleMark(editor, mark);
          //   }
          // }
        }}
      />
    </Slate>
  );
};

export default Editor;
