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
import { textBlockPlugin } from "./plugin/text-block";
import { indentPlugin } from "./plugin/indent";
import { quoteBlockPlugin } from "./plugin/quote-block";
import { highlightBlockPlugin } from "./plugin/highlight-block";
import { dividerBlockPlugin } from "./plugin/divider-block";
import { withSchema } from "./plugin/base/withSchema";
import React from "react";
import HoverToolbar from "./components/HoverToolbar";
import { mockSelectionPlugin } from "./plugin/mock-selection";

const classNamePrefix = "editor";
const INIT_NODE = [
  {
    children: [{ text: "1111111111111111111111111" }],
    // "text-block": true,
    // "highlight-block": {
    //   color: "rgb(31, 35, 41)",
    //   borderColor: "rgb(255, 165, 61)",
    //   fillColor: "rgb(254, 234, 210)",
    // },

    //"divider-block": true,
  },
  {
    children: [
      {
        text: "3啛啛喳喳错错错错错错错错错错错错错错错错错错错错错错错错错错错错程序法",
      },
    ],
    "text-block": true,
    "highlight-block": {
      color: "rgb(31, 35, 41)",
      borderColor: "rgb(255, 165, 61)",
      fillColor: "rgb(254, 234, 210)",
    },
  },
  // {
  //   children: [{ text: "2" }],
  //   "text-block": true,
  //   "highlight-block": {
  //     color: "rgb(31, 35, 41)",
  //     borderColor: "rgb(255, 165, 61)",
  //     fillColor: "rgb(254, 234, 210)",
  //   },
  // },
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

  return (
    <>
      <SlateEditable
        className={styles[`${classNamePrefix}`]}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        renderElement={pluginController.renderElement}
        renderLeaf={pluginController.renderLeaf}
        readOnly={readOnly}
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
      />
      <HoverToolbar editorMouseDown={mouseDown} />
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
      fontLeafPlugin,
      textBlockPlugin,
      alignPlugin,
      headingPlugin,
      boldPlugin,
      italicPlugin,
      underLinePlugin,
      lineThroughPlugin,
      indentPlugin,
      quoteBlockPlugin,
      dividerBlockPlugin,
      hyperLinkPlugin,
      mockSelectionPlugin
    );
    pluginController.apply();
    this.state = {
      editor: withSchema(withHistory(withReact(createEditor()))) as any,
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
