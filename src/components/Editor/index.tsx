import {
  Editable as SlateEditable,
  withReact,
  useSlate,
  Slate,
  ReactEditor,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.less";
import { EDITOR_EVENT } from "./event/action";
import { REACT_EVENTS } from "./event/react";
import { pluginController } from "./plugin/base/controller";
import {
  alignPlugin,
  boldPlugin,
  fontLeafPlugin,
  headingPlugin,
  hyperLinkPlugin,
} from "./plugin";
import { italicPlugin } from "./plugin/italic";
import { underLinePlugin } from "./plugin/under-line";
import { lineThroughPlugin } from "./plugin/line-through";
import { TEXT_BLOCK_KEY, textBlockPlugin } from "./plugin/text-block";
import { indentPlugin } from "./plugin/indent";
import { quoteBlockPlugin } from "./plugin/quote-block";
import { highlightBlockPlugin } from "./plugin/highlight-block";
import { dividerBlockPlugin } from "./plugin/divider-block";
import { withSchema } from "./plugin/base/withSchema";
import React from "react";
import HoverToolbar from "./components/HoverToolbar";
import { mockSelectionPlugin } from "./plugin/mock-selection";
import FloatMenu from "./components/FloatMenu";
import { fontBlockPlugin } from "./plugin/font-block";
import { inlineCodePlugin } from "./plugin/inline-code";
import {
  HEADER_TITLE_KEY,
  headerTitleBlockPlugin,
} from "./plugin/header-title-block";
import { withLayout } from "./plugin/base/withLayout";

const classNamePrefix = "editor";
const INIT_NODE = [
  {
    [HEADER_TITLE_KEY]: true,
    children: [{ text: "" }],
  },
  {
    children: [{ text: "" }],
    placeholder: "请输入",
    holdingPlaceholder: true,
    [TEXT_BLOCK_KEY]: true,
  },
];

type EditorProps = {
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
} & EditableProps;

type EditableProps = {
  placeholder?: string;
  readOnly?: boolean;
};

const Editable: React.FC<EditableProps> = ({ placeholder, readOnly }) => {
  const baseEditor = useSlate();

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      pluginController.event.trigger(REACT_EVENTS.KEY_DOWN, event);
    },
    []
  );

  useEffect(() => {
    pluginController.event.trigger(EDITOR_EVENT.BASE_EDITOR_CHANGE, baseEditor);
  }, [baseEditor]);

  useEffect(() => {
    pluginController.event.trigger(EDITOR_EVENT.READONLY_CHANGE, !!readOnly);
  }, [readOnly]);

  useEffect(() => {
    const selection = baseEditor.selection;
    selection?.anchor?.offset !== selection?.focus?.offset &&
      pluginController.event.trigger(EDITOR_EVENT.SELECTION_CHANGE, selection);
  }, [baseEditor.selection]);

  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const onMouseDown = () => {
    setMouseDown(true);
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    pluginController.event.trigger(EDITOR_EVENT.BLUR, event);
  };

  const onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    pluginController.event.trigger(EDITOR_EVENT.FOCUS, event);
  };

  return (
    <>
      <SlateEditable
        className={styles[`${classNamePrefix}`]}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        renderElement={pluginController.renderElement}
        renderLeaf={pluginController.renderLeaf}
        readOnly={readOnly}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {!readOnly && (
        <>
          <HoverToolbar editorMouseDown={mouseDown} />
          <FloatMenu />
        </>
      )}
    </>
  );
};

type EditableState = {
  editor: ReactEditor;
};

class Editor extends React.Component<EditorProps, EditableState> {
  constructor(props: EditorProps) {
    super(props);
    pluginController.register(
      highlightBlockPlugin,
      quoteBlockPlugin,
      headerTitleBlockPlugin,
      dividerBlockPlugin,
      fontLeafPlugin,
      textBlockPlugin,
      alignPlugin,
      headingPlugin,
      boldPlugin,
      italicPlugin,
      underLinePlugin,
      lineThroughPlugin,
      indentPlugin,
      hyperLinkPlugin,
      mockSelectionPlugin,
      fontBlockPlugin,
      inlineCodePlugin
    );
    pluginController.apply();
    this.state = {
      editor: withSchema(
        withLayout(withHistory(withReact(createEditor())))
      ) as any,
    };
  }
  componentWillUnmount(): void {
    pluginController.destroy();
  }
  render() {
    return (
      <Slate
        editor={this.state.editor}
        initialValue={this.props.initialValue || INIT_NODE}
        onChange={this.props.onChange}
      >
        <Editable {...this.props} />
      </Slate>
    );
  }
}

export default Editor;
