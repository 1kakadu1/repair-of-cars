import React from 'react';
import { ICheckboxProps } from './checkbox.model';

export const Checkbox = ({
	checked,
	onChange,
	name,
	id,
	value,
	label,
}: ICheckboxProps) => {
	const onChangeInput = () => {
		onChange && onChange(!checked, id, value);
	};

	return (
		<div className="checkbox" onClick={onChangeInput}>
			<input
				className="custom-checkbox"
				type="checkbox"
				id={id}
				name={name}
				onChange={() => void 0}
				value={value || name}
				checked={checked}
			/>
			{label && <label htmlFor={name}>{label}</label>}
		</div>
	);
};
