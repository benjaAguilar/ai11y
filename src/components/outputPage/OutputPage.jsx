import Editor from "@monaco-editor/react";
import styles from "./output.module.css";
import { useRef } from "react";
import Scores from "./scores/Scores";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const dummyResponse = {
  htmlCode: `    <header>
      <div class="logo">
        <img class="logo-img" src="./imgs/logo.svg" alt="" />
        <p class="logo-title">Color<span id="col">Cast</span></p>
      </div>
      <div class="search">
        <div class="search-box">
          <input
            type="text"
            id="searchbar"
            placeholder="Search"
            autocomplete="off"
          />
          <div class="suggestions"></div>
        </div>
        <img class="search-icon" src="./imgs/search.svg" alt="" />
      </div>
    </header>
`,
  scores: { after: 90, before: 50 },
  suggestions: [
    "suggestion one lorem ipsum",
    "suggestion two lorem ipsum",
    "suggestion three lorem ipsum",
    "suggestion four lorem ipsum",
  ],
};

function OutputCode() {
  const { response } = useOutletContext();
  const nav = useNavigate();
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

  // if (!response.htmlCode) return <h1>Loading</h1>;

  return (
    <>
      <nav>
        <Link>Details</Link>
        <Link to={"/semantic-html/compare"}>Comparison</Link>
        <button onClick={() => nav("/semantic-html")}>Input new HTML</button>
      </nav>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Output Html</h2>
          <Editor
            className={styles.editor}
            height="400px"
            defaultLanguage="html"
            value={/*response.htmlCode*/ dummyResponse.htmlCode}
            theme="vs-dark"
            options={{ readOnly: true }}
            onMount={handleEditorDidMount}
          />
          <div>
            <button onClick={copyCode}>Copy</button>
            <button onClick={() => nav("/semantic-html")}>
              Input new HTML
            </button>
          </div>
        </div>
        <div>
          {/* Scores and Suggestions! */}
          <Scores
            scoreAfter={/*response.scores.after*/ dummyResponse.scores.after}
            scoreBefore={/*response.scores.before*/ dummyResponse.scores.before}
          />
          <div className={styles.suggestions}>
            <h2>Suggestions</h2>
            <div>
              <ul>
                {
                  /*response.suggestions.map((suggestion, index) => (
              <p key={index}>{suggestion}</p>
            ))*/ dummyResponse.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OutputCode;
