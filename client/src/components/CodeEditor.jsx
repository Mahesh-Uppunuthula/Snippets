import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor(props) {
  return (
    <Editor
      className="code-editor"
      width="100%"
      height="100%"
      defaultValue={props.content}
      defaultLanguage="javascript"
      theme="vs-dark"
      onChange={(value,event)=>{props.textChange(value,event)}}
    />
  );
}

export default CodeEditor;
