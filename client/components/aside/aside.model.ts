export interface IAsideProps {
	className?: string;
	open?: boolean;
	onClose?: () => void;
}

export interface IAsideGeneralProps extends IAsideProps {
	children?: JSX.Element;
}
