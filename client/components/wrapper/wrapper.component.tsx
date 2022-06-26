import cl from './wrapper.module.scss';
export interface IWrapperProps {
	className?: string;
	shadow?: boolean;
	color?: '#fff' | '#6A6A6A' | '#F8F8F8';
	children: JSX.Element | JSX.Element[];
}

export const Wrapper = ({
	children,
	shadow,
	className = '',
	color = '#fff',
}: IWrapperProps) => {
	return (
		<div
			className={cl.wrapper + ' ' + className + ' ' + (shadow ? cl.shadow : '')}
			style={{ backgroundColor: color }}
		>
			{children}
		</div>
	);
};
