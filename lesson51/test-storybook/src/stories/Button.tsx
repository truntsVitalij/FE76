import React from "react";

import "./button.css";

export interface ButtonProps {
  className?: string;
  /** Button mode. One of three UI types */
  mode?: "primary" | "secondary" | "tetriary";
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  mode = "secondary",
  size = "medium",
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        "storybook-button",
        `storybook-button--${size}`,
        `storybook-button--${mode}`,
        className,
      ].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
