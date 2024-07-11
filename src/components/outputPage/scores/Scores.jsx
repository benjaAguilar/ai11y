import { Circle } from "rc-progress";
import styles from "../output.module.css";

function Scores() {
  return (
    <div>
      <h2>Ai scores</h2>
      <div className={styles.circlesBox}>
        <div>
          <div className={styles.circleBox}>
            <Circle className={styles.circle} percent={40} strokeWidth={5} />
            <div className={styles.score}>100</div>
          </div>
          <p>Before</p>
        </div>
        <div>
          <div className={styles.circleBox}>
            <Circle className={styles.circle} percent={70} strokeWidth={5} />
            <div className={styles.score}>100</div>
          </div>
          <p>After</p>
        </div>
      </div>
    </div>
  );
}

export default Scores;
