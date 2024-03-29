import React from 'react';

export const TextItemLabel = ({
	title,
	value,
	className = '',
}: {
	title: string | JSX.Element;
	value: string | number | JSX.Element;
	className?: string;
}) => {
	return (
		<div className={'text-item text-item_column' + className}>
			<div className="text-item__label text-item_h1">{title}</div>
			<div className="text-item__value text-item_p">{value}</div>
		</div>
	);
};

export const TextItem = ({
	label,
	value,
	className = '',
}: {
	label: string;
	value: string | number;
	className?: string;
}) => {
	return (
		<div className={'text-item' + className}>
			<div className="text-item__label">
				{label}
				<span className="text-item__dot"></span>
			</div>
			<div className="text-item__value">{value}</div>
		</div>
	);
};

export const TextItems = ({
	className = '',
	items,
	title,
}: {
	title?: string;
	items: { label: string; value: string | number }[];
	className?: string;
}) => {
	return (
		<div className={'text-items-container ' + className}>
			{title && <div className="text-items__label">{title}</div>}
			<ul className="text-items-list">
				{items.map(({ label, value }, index) => (
					<li className="text-items-list__item" key={index}>
						<TextItem label={label} value={value} />
					</li>
				))}
			</ul>
		</div>
	);
};
