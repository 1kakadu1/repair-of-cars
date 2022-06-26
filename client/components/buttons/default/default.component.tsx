import Link from 'next/link';

interface IButtonDefaultProps extends React.DOMAttributes<HTMLButtonElement> {
	className?: string;
	children: JSX.Element | string;
	link?: string;
	type?: 'submit' | 'button' | 'reset' | undefined;
	disabled?: boolean;
	outline?: boolean;
}

export const ButtonDefault = ({
	children,
	className = '',
	onClick,
	link,
	type = 'button',
	disabled,
	outline,
	...props
}: IButtonDefaultProps) => {
	return link ? (
		<Link href={link}>
			<a
				className={`${className} btn-default ${
					outline ? 'btn-default_outline' : ''
				}`}
			>
				<span className="btn-default__content">{children}</span>
			</a>
		</Link>
	) : (
		<button
			className={`${className} btn-default ${
				outline ? 'btn-default_outline' : ''
			}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
			{...props}
		>
			<span className="btn-default__content">{children}</span>
		</button>
	);
};
