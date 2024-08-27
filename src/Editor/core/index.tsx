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

const DEFAULT_PRIORITY = 100;

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
      const blockPlugins = plugins?.filter(
        (item) => item.type === PLUGIN_TYPE.BLOCK
      );
      blockPlugins?.sort(
        (a, b) =>
          (b.priority || DEFAULT_PRIORITY) - (a.priority || DEFAULT_PRIORITY)
      );
      return (
        <>
          {blockPlugins?.map((item) => {
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
      const inlinePlugins = plugins?.filter(
        (item) => item.type === PLUGIN_TYPE.INLINE
      );
      inlinePlugins?.sort(
        (a, b) =>
          (b.priority || DEFAULT_PRIORITY) - (a.priority || DEFAULT_PRIORITY)
      );
      return (
        <>
          {inlinePlugins?.map((item) => {
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

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      plugins?.forEach((item) => item?.onKeyDown?.(event));
    },
    [plugins]
  );

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
      <Editable
        placeholder={placeholder}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

export default Editor;
