export interface IModalProps {
	children: JSX.Element;
	open: boolean;
	onClose: () => void;
	className?: string;
}
