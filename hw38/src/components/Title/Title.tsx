interface TitleProps {
	children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
	return <h2>{children}</h2>;
};
