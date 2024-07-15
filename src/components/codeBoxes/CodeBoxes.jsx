import Editor from "@monaco-editor/react";
import styles from "./codeBoxes.module.css";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

function CodeBoxes() {
  const { userHtml, response } = useOutletContext();
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  function handleInputEditorDidMount(editor) {
    inputRef.current = editor;
  }

  function handleEditorDidMount(editor) {
    outputRef.current = editor;
  }

  function copyCode(cRef) {
    if (cRef.current) {
      navigator.clipboard.writeText(cRef.current.getValue());
      alert("code copied!");
    }
  }

  return (
    <div className={styles.codeContainer}>
      <div className={styles.box}>
        <h2>Input Html</h2>
        <Editor
          className={styles.editor}
          height="400px"
          defaultLanguage="html"
          value={userHtml}
          theme="vs-dark"
          options={{ readOnly: true }}
          onMount={handleInputEditorDidMount}
        />
        <button onClick={() => copyCode(inputRef)}>Copy</button>
      </div>
      <div className={styles.box}>
        <h2>Output Html</h2>
        <Editor
          className={styles.editor}
          height="400px"
          defaultLanguage="html"
          value={response.htmlCode}
          theme="vs-dark"
          options={{ readOnly: true }}
          onMount={handleEditorDidMount}
        />
        <button onClick={() => copyCode(outputRef)}>Copy</button>
      </div>
    </div>
  );
}

export default CodeBoxes;
