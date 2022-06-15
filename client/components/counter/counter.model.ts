export interface ICounterProps {
	count: number;
	onAdd: () => void;
	onSub: () => void;
	disableAdd?: boolean; 
}
