import { Circle } from "rc-progress";
import styles from "../output.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Scores({ scoreAfter, scoreBefore }) {
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (before < scoreBefore) {
        setBefore((score) => score + 1);
      }

      if (after < scoreAfter) {
        setAfter((score) => score + 1);
      }
    }, 10);
  }, [after, before, scoreAfter, scoreBefore]);

  return (
    <div>
      <h2>Ai scores</h2>
      <div className={styles.circlesBox}>
        <div>
          <div className={styles.circleBox}>
            <Circle
              className={styles.circle}
              percent={before}
              strokeWidth={5}
            />
            <div className={styles.score}>{before}</div>
          </div>
          <p>Before</p>
        </div>
        <div>
          <div className={styles.circleBox}>
            <Circle className={styles.circle} percent={after} strokeWidth={5} />
            <div className={styles.score}>{after}</div>
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
