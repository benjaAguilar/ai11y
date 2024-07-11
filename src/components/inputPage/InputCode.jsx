import Editor from "@monaco-editor/react";
import styles from "../codeBoxes/codeBoxes.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";

function InputCode() {
  const { userHtml, setUserHtml, gen } = useOutletContext();
  const nav = useNavigate();

  function handleEditorChange(value) {
    setUserHtml(value);
  }

  function handleBtn() {
    if (userHtml === "") return;

    gen();
    nav("/details");
  }

  return (
    <div className={styles.box}>
      <h2>Input Html</h2>
      <Editor
        className={styles.editor}
        height="400px"
        defaultLanguage="html"
        theme="vs-dark"
        value={userHtml}
        onChange={handleEditorChange}
      />
      <button onClick={handleBtn}>Improve Html</button>
    </div>
  );
}

export default InputCode;
