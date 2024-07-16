import styles from "./homep.module.css";

function Hompage() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h1>
          <span>AI</span>11Y
        </h1>
        <p>
          improve web accesibility with <span>AI</span>
        </p>
      </div>
      <div className={styles.btnBox}>
        <button>Semantic Html</button>
        <button>Color contrast</button>
      </div>
    </div>
  );
}

export default Hompage;
