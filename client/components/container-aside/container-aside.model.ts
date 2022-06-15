export interface IContainerAsideProps {
	aside: JSX.Element;
	content: JSX.Element;
	position?: 'left' | 'right';
	sticky?: boolean;
	height?: 'auto' | 'full';
	shadow?: boolean;
}
