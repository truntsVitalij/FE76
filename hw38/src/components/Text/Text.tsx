interface TextProps {
	text: string;
}

export const Text = ({ text }: TextProps) => {
	return <h2 style={{ marginBottom: '40px' }}>{text}</h2>;
};
