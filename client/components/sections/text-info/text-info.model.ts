export interface ITextInfoProps {
	title?: string;
	desc?: string;
	link?: string;
	preview: string;
	children: JSX.Element | JSX.Element[];
	order?: 'right' | 'left';
}
