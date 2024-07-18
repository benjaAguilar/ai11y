import { Circle } from "rc-progress";
import styles from "../output.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Flex, Heading } from "@radix-ui/themes";

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
    <Flex direction="column" gap="1rem">
      <Heading as="h2">Ai scores</Heading>
      <div className={styles.circlesBox}>
        <Flex direction="column" justify="center" align="center" gap="1rem">
          <div className={styles.circleBox}>
            <Circle
              className={styles.circle}
              percent={before}
              strokeWidth={5}
            />
            <div className={styles.score}>{before}</div>
          </div>
          <Heading as="h5" size="4">
            Before
          </Heading>
        </Flex>
        <Flex direction="column" justify="center" align="center" gap="1rem">
          <div className={styles.circleBox}>
            <Circle className={styles.circle} percent={after} strokeWidth={5} />
            <div className={styles.score}>{after}</div>
          </div>
          <Heading as="h5" size="4">
            After
          </Heading>
        </Flex>
      </div>
    </Flex>
  );
}

Scores.propTypes = {
  scoreAfter: PropTypes.number.isRequired,
  scoreBefore: PropTypes.number.isRequired,
};

export default Scores;
