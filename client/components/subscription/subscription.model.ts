export interface ISubscriptionProps {
	title: string;
	onSend?: (value: string) => void;
	className?: string;
	write?: boolean;
}
