import { useContext } from 'react';
import { GameContext } from '@/provider/game-context';
import styles from '@/styles/score.module.css';

export default function Score() {
  const { score } = useContext(GameContext);

  return (
    <div className={styles.score}>
            Score
      <div>{score}</div>
    </div>
  );
}
