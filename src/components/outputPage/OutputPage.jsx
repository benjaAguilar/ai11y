import Editor from "@monaco-editor/react";
import styles from "./output.module.css";
import { useRef } from "react";
import Scores from "./scores/Scores";
import { useOutletContext } from "react-router-dom";

function OutputCode() {
  const { response } = useOutletContext();
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

  if (!response.htmlCode) return <h1>Loading</h1>;

  return (
    <div className={styles.container}>
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
        <button onClick={copyCode}>Copy</button>
      </div>
      <div>
        {/* Scores and Suggestions! */}
        <Scores
          scoreAfter={response.scores.after}
          scoreBefore={response.scores.before}
        />
        <div className={styles.suggestions}>
          <h2>Suggestions</h2>
          <div>
            {response.suggestions.map((suggestion, index) => (
              <p key={index}>{suggestion}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputCode;
