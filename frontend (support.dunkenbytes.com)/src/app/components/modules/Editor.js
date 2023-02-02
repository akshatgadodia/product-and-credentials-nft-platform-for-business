import "./stylesheets/Editor.css";
import React, { useState } from "react";
import EDITOR_JS_TOOLS from "@/app/config/editor";
import Undo from "editorjs-undo";
import DragDrop from "editorjs-drag-drop";
import { createReactEditorJS } from "react-editor-js";
import EditorParser from "../elements/EditorParser";

const Editor = props => {
  console.log(EDITOR_JS_TOOLS);
  const [data, setData] = useState(props.data);
  const ReactEditorJS = createReactEditorJS();
  const editorCore = React.useRef(null);
  const handleInitialize = instance => {
    editorCore.current = instance;
  };
  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new Undo({ editor });
    new DragDrop(editor);
  };
  const handleSave = async () => {
    const savedData = await editorCore.current.save();
    setData(savedData);
  };

  return (
    <>
      <ReactEditorJS
        onInitialize={handleInitialize}
        onReady={handleReady}
        defaultValue={data}
        tools={EDITOR_JS_TOOLS}
        placeholder="Let`s write an awesome story!"
      />
      <button onClick={handleSave}>Save</button>
      <div className="output">
      <h1>OUTPUT</h1>
        {data && <EditorParser data={data}/>}
      </div>
    </>
  );
};

export default Editor;
