import React from 'react';
import { Container } from '../../container/container.component';

export const TextInfoBg = ({
	text,
	title,
	background,
	children,
}: {
	text?: string;
	title?: string;
	background?: string;
	children?: JSX.Element;
}) => {
	return (
		<div
			className="text-info"
			style={{ backgroundImage: background ? `url(${background})` : undefined }}
		>
			<Container>
				{children ? (
					children
				) : (
					<>
						<h1 className="text-info__title">{title || ''}</h1>
						<p className="text-info__desc">{text || ''}</p>
					</>
				)}
			</Container>
		</div>
	);
};
