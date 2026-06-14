import React from 'react';

interface QuickViewButtonProps {
  onClick: () => void;
}

const QuickViewButton: React.FC<QuickViewButtonProps> = ({ onClick }) => {
  return (
    <button className="quick-view-btn" onClick={onClick}>
      Быстрый просмотр
    </button>
  );
};

export default QuickViewButton;