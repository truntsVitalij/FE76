import type { FC, PropsWithChildren } from "react"

interface IButtonProps extends PropsWithChildren {
    onClick: () => void
}

export const Button: FC<IButtonProps> = ({ children, onClick }) => {
    return <button onClick={onClick}>{children}</button>
}