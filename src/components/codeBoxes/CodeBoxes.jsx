import Editor from "@monaco-editor/react";
import styles from "./codeBoxes.module.css";
import { useRef } from "react";

function CodeBoxes() {
  const html = `<h1> Hello World lol </h1>`;
  const outputRef = useRef(null);

  function handleEditorDidMount(editor) {
    outputRef.current = editor;
  }

  function copyCode() {
    if (outputRef.current) {
      navigator.clipboard.writeText(outputRef.current.getValue());
      alert("code copied!");
    }
  }

  return (
    <>
      <div className={styles.box}>
        <h2>Input Html</h2>
        <Editor
          className={styles.editor}
          height="400px"
          defaultLanguage="html"
          theme="vs-dark"
        />
      </div>
      <div className={styles.box}>
        <h2>Output Html</h2>
        <Editor
          className={styles.editor}
          height="400px"
          defaultLanguage="html"
          value={html}
          theme="vs-dark"
          options={{ readOnly: true }}
          onMount={handleEditorDidMount}
        />
        <button onClick={copyCode}>Copy</button>
      </div>
    </>
  );
}

export default CodeBoxes;
