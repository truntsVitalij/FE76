import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react"

interface IButtonProps extends PropsWithChildren, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    onClick: (count: number) => void;
}

export const Button: FC<IButtonProps> = ({ onClick, children, ...props }) => {
    return <button onClick={() => onClick(1)} {...props}>{children}</button>
}

function Button2({ onClick, children }: IButtonProps) {
    return <button onClick={() => onClick(1)}>{children}</button>
}