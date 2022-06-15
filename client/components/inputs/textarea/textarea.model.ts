export interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value?: any;
	id: string;
	label?: string;
	className?: string;
	classNameInput?: string;
	error?: string;
	validation?: (value: any) => string;
	validationOnChange?: boolean;
	write?: boolean;
	debounce?: boolean;
}
