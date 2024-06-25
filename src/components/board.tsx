import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Tile as TileType } from '@/type/tile-type';
import styles from '@/styles/board.module.css';
import { GameContext } from '@/provider/game-context';
import MobileSwiper, { SwipeInput } from './mobile-swipe';
import Tile from './tile';

export default function Board() {
  const { getTiles, moveTiles, startGame } = useContext(GameContext);
  const initialized = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.code) {
      case 'ArrowUp':
        moveTiles('move_up');
        break;
      case 'ArrowDown':
        moveTiles('move_down');
        break;
      case 'ArrowLeft':
        moveTiles('move_left');
        break;
      case 'ArrowRight':
        moveTiles('move_right');
        break;
      }
    },
    [moveTiles],
  );

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: SwipeInput) => {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          moveTiles('move_right');
        } else {
          moveTiles('move_left');
        }
      } else {
        if (deltaY > 0) {
          moveTiles('move_down');
        } else {
          moveTiles('move_up');
        }
      }
    },
    [moveTiles],
  );

  const renderGrid = () => {
    const cells: React.ReactNode[] = [];
    const totalCellsCount = 16;

    for (let index = 0; index < totalCellsCount; index++) {
      cells.push(<div className={styles.cell} key={index} />);
    }

    return cells;
  };

  const renderTiles = () => {
    return getTiles().map((tile: TileType) => {
      return <Tile key={`${tile.id}`} {...tile} />;
    });
  };

  useEffect(() => {
    if (!initialized.current) {
      startGame();
      initialized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <div className={styles.board}>
        <div className={styles.tiles}>{renderTiles()}</div>
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
    </MobileSwiper>
  );
}
