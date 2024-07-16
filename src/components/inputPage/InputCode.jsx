import Editor from "@monaco-editor/react";
import * as htmlparser2 from "htmlparser2";
import styles from "./input.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";

function InputCode() {
  const { userHtml, setUserHtml, gen } = useOutletContext();
  const nav = useNavigate();

  function handleEditorChange(value) {
    setUserHtml(value);
  }

  function isHtml() {
    try {
      const dom = htmlparser2.parseDocument(userHtml);
      const isHtmlNode = dom.children.some(
        (node) => node.type === "directive" || node.type === "tag"
      );

      return isHtmlNode;
    } catch (error) {
      console.log("Error parsing HTML: " + error);
      return false;
    }
  }

  function handleBtn() {
    const isValidHtml = isHtml();

    if (!isValidHtml) {
      alert("please provide a valid HTML code");
      return;
    }

    gen();
    nav("/semantic-html/details");
  }

  function clearInput() {
    setUserHtml("");
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
      <div className={styles.btnBox}>
        <button onClick={handleBtn}>Improve Html</button>
        <button onClick={clearInput}>Clear Input</button>
      </div>
    </div>
  );
}

export default InputCode;
