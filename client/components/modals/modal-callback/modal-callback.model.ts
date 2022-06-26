export interface IModalCallbackProps {
	open: boolean;
	onToggleOpen: (value: boolean) => void;
	onSend?: ({ name, phone }: { name: string; phone: string }) => void;
}
