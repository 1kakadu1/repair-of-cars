import React from 'react';
import { IRadioProps } from './radio.model';

export const Radio = ({
	checked,
	onChange,
	name,
	id,
	value,
	label,
}: IRadioProps) => {
	const onChangeInput = () => {
		onChange && onChange(value, id);
	};

	return (
		<div className="radio" onClick={onChangeInput}>
			<input
				className="custom-radio"
				type="radio"
				id={id}
				name={name}
				onChange={() => void 0}
				value={value}
				checked={checked}
			/>
			{label && <label htmlFor={name}>{label}</label>}
		</div>
	);
};
