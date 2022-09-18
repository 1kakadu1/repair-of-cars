export interface ICardOrderProps {
	className?: string;
	onSubmit: (msgEmail: boolean, policy: boolean) => void;
	disabled: boolean;
}
