import React from 'react';
import type { IQuickViewButtonProps } from './types';
import styles from './QuickViewButton.module.css';

const QuickViewButton: React.FC<IQuickViewButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.quickViewBtn} onClick={onClick}>
      Быстрый просмотр
    </button>
  );
};

export default QuickViewButton;