import Editor from "@monaco-editor/react";
import styles from "../codeBoxes/codeBoxes.module.css";

function InputCode() {
  return (
    <div className={styles.box}>
      <h2>Input Html</h2>
      <Editor
        className={styles.editor}
        height="400px"
        defaultLanguage="html"
        theme="vs-dark"
      />
      <button>Improve Html</button>
    </div>
  );
}

export default InputCode;
