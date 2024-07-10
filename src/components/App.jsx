import CodeBoxes from "./codeBoxes/CodeBoxes";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <header>
        <h1>
          <span>Ai</span>11y
        </h1>
        <p>Improve web accessibility with AI</p>
      </header>
      <main>
        <section>
          <button>Improve HTML</button>
          <button>Compare</button>
        </section>
        <section>
          {/* Code text boxes goes here */}
          <div className={styles.codeContainer}>
            <CodeBoxes />
          </div>
          <section>
            {/* overall info goes here */}
            <div>
              <h2>Ai Scores</h2>
            </div>
            <div>
              <h2>Ai Suggestions</h2>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
