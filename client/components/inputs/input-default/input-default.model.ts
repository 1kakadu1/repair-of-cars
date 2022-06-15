export interface IInputDefaultProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: (value: any) => void;
	value?: any;
	id: string;
	type?: string;
	label?: string;
	className?: string;
	classNameInput?: string;
	error?: string;
	validation?: (value: any) => string;
	validationOnChange?: boolean;
	write?: boolean;
	debounce?: boolean;
	endAdornment?: JSX.Element;
}
