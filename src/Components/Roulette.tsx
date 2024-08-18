/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { css } from '@emotion/react';

const Roulette = ({ items, targetItem }: { items: string[], targetItem: string }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const rouletteContainerRef = useRef<HTMLDivElement>(null);

  // 10回繋げたリストを作成
  const extendedItems = Array(10).fill(items).flat();
  const itemHeight = 150; // 各項目の高さ
  const containerHeight = 200; // ルーレット表示部分の高さ
  const halfVisibleItems = Math.floor(containerHeight / itemHeight / 2); // 中央に表示するためのオフセット

  const targetIndex = extendedItems.indexOf(targetItem, items.length * 5);

  const handleSpin = () => {
    setIsSpinning(true);

    const spinDuration = 5; // 5秒で5回転
    const totalRotations = 5; // 5回転

    if (rouletteContainerRef.current) {
      rouletteContainerRef.current.style.transition = `transform ${spinDuration}s ease-out`;
      const finalPosition = targetIndex * itemHeight - halfVisibleItems * itemHeight;
      const initialPosition = finalPosition - itemHeight * items.length * totalRotations;

      // ルーレットを初期位置から5回転させ、最終的にtargetItemで停止させる
      rouletteContainerRef.current.style.transform = `translateY(${initialPosition}px)`;

      setTimeout(() => {
        rouletteContainerRef.current!.style.transform = `translateY(-${finalPosition}px)`;
        setSelectedItem(targetItem);
        setIsSpinning(false);
      }, spinDuration * 1000);
    }
  };

  const getCurrentCenteredItem = () => {
    if (rouletteContainerRef.current) {
      const transformValue = rouletteContainerRef.current.style.transform;
      const translateY = parseFloat(transformValue.split('(')[1]); // 現在のtranslateYの値を取得
      const itemIndex = Math.round(-translateY / itemHeight) + halfVisibleItems; // 中央に表示されているアイテムのインデックスを計算
      return extendedItems[itemIndex];
    }
    return null;
  };

  return (
    <div css={styles.container}>
      <div css={styles.rouletteContainer}>
        <div ref={rouletteContainerRef} css={styles.spinningTextContainer}>
          {extendedItems.map((item, index) => (
            <div key={index} css={styles.spinningText}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <Button 
        variant="contained"
        onClick={handleSpin} 
        disabled={isSpinning}
        style={styles.button}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </Button>
      <Button 
        variant="contained"
        onClick={() => alert(`Currently centered item: ${getCurrentCenteredItem()}`)} 
        disabled={isSpinning}
        style={styles.button}
      >
        Get Centered Item
      </Button>
      {selectedItem && <div css={styles.result}>Selected: {selectedItem}</div>}
    </div>
  );
};

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#007BFF',
    color: 'white',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  }),
  rouletteContainer: css({
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    backgroundColor: '#0066cc',
  }),
  spinningTextContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  spinningText: css({
    fontSize: '2rem',
    padding: '5px 0',
    textAlign: 'center',
    opacity: 0.9,
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  button: {
    marginTop: '20px',
  },
  result: css({
    marginTop: '20px',
    fontSize: '2rem',
  }),
};

export default Roulette;
