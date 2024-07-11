import { Circle } from "rc-progress";
import styles from "../output.module.css";
import PropTypes from "prop-types";

function Scores({ scoreAfter, scoreBefore }) {
  return (
    <div>
      <h2>Ai scores</h2>
      <div className={styles.circlesBox}>
        <div>
          <div className={styles.circleBox}>
            <Circle
              className={styles.circle}
              percent={scoreBefore}
              strokeWidth={5}
            />
            <div className={styles.score}>{scoreBefore}</div>
          </div>
          <p>Before</p>
        </div>
        <div>
          <div className={styles.circleBox}>
            <Circle
              className={styles.circle}
              percent={scoreAfter}
              strokeWidth={5}
            />
            <div className={styles.score}>{scoreAfter}</div>
          </div>
          <p>After</p>
        </div>
      </div>
    </div>
  );
}

Scores.propTypes = {
  scoreAfter: PropTypes.number.isRequired,
  scoreBefore: PropTypes.number.isRequired,
};

export default Scores;
