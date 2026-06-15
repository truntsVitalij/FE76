type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
};

function Button({ onClick, children, className = "" }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
