export interface IRadioProps {
	checked: boolean;
	name?: string;
	id: string;
	onChange?: (value: string, id: string, name?: string) => void;
	value: string;
	label: string | JSX.Element;
}
