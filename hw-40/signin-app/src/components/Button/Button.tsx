import "./Button.css";

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button({
  onClick,
  children,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <span className="btn-loader">⏳</span> : children}
    </button>
  );
}

export default Button;
