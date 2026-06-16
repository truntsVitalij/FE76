import "./Badge.css";

type BadgeVariant = "discount" | "sale" | "new" | "hit";

type BadgeProps = {
  variant: BadgeVariant;
  children: React.ReactNode;
};

function Badge({ variant, children }: BadgeProps) {
  return <span className={`badge ${variant}`}>{children}</span>;
}

export default Badge;
