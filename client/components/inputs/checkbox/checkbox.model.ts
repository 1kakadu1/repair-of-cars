export interface ICheckboxProps {
	checked: boolean;
	name?: string;
	id: string;
	onChange?: (checked: boolean, name?: string, value?: string) => void;
	value?: string;
	label: string | JSX.Element;
}
