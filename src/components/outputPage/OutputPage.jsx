import Editor from "@monaco-editor/react";
import styles from "./output.module.css";
import { useRef } from "react";
import Scores from "./scores/Scores";

function OutputCode() {
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
    <div className={styles.container}>
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
      <div>
        {/* Scores and Suggestions! */}
        <Scores />
        <div className={styles.suggestions}>
          <h2>Suggestions</h2>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum in eros id purus tristique aliquam nec a erat. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nisi
              quis ligula hendrerit congue sit amet et lorem. Integer eget
              rutrum ipsum, in faucibus libero. Quisque eu elit dictum,
              facilisis neque ac, congue ipsum. Etiam pretium sapien a magna
              porttitor cursus. Aenean at laoreet felis. In vehicula turpis
              posuere, ullamcorper ante non, volutpat metus. Suspendisse
              condimentum sollicitudin nibh et tempus. Aenean tempor urna
              luctus, ornare libero non, consectetur turpis. Morbi facilisis nec
              sem id tempor. Integer a augue eget nisl consectetur mollis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputCode;
