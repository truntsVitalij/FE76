type ButtonQuickViewProps = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
};

function ButtonQuickView({
  onClick,
  children,
  className = "",
}: ButtonQuickViewProps) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default ButtonQuickView;
