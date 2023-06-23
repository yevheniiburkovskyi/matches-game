import { useCallback, useEffect, useMemo } from 'react';

import { Avatar } from '../../UI';
import { MatchesCountBoard, PlayerWrapper } from '../GameUI';

import { useMatchesCount } from '../../../store/matchesStore';
import { EPlayer, usePlayers } from '../../../store/playersStore';

import { generateAIMatchesPickCount } from '../../../utils/generateAIMatchesPickCount';
import { AI_TURN_TIME } from '../../../utils/variables';

import styles from './AIBoard.module.scss';

interface IProps {
  setFinishGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const AIBoard = ({ setFinishGame }: IProps) => {
  const { AIMatchesCount, leftMathesCount, incrAIMatchesCount } = useMatchesCount();
  const { currentPlayer, setCurrentPlayer } = usePlayers();

  const isActive = useMemo(() => currentPlayer === EPlayer.AI, [currentPlayer]);

  const handleTake = useCallback(() => {
    if (leftMathesCount) {
      const AIPickCount = generateAIMatchesPickCount();
      incrAIMatchesCount(AIPickCount);
      if (AIPickCount === leftMathesCount) {
        setFinishGame(true);
      } else {
        setCurrentPlayer(EPlayer.human);
      }
    }
  }, [incrAIMatchesCount, leftMathesCount, setCurrentPlayer, setFinishGame]);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(handleTake, AI_TURN_TIME);
      return () => clearTimeout(timer);
    }
  }, [handleTake, incrAIMatchesCount, isActive, setCurrentPlayer]);

  return (
    <section className={styles.player}>
      <MatchesCountBoard count={AIMatchesCount} />
      <PlayerWrapper active={isActive}>
        <Avatar avatar="🤖" />
      </PlayerWrapper>
    </section>
  );
};

export { AIBoard };
