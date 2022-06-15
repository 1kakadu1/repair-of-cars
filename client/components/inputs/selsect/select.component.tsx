import React, { useState } from 'react';
import { ISelectProps } from './select.model';

export const SelectDefault = ({
	value: valueProps,
	label,
	id,
	placeholder = '',
	onChange,
	className = '',
	classNameSelect = '',
	error: errorProps,
	validation,
	validationOnChange,
	options,
	onBlur,
	onFocus,
	black = false,
	name = '',
}: ISelectProps) => {
	const [error, setError] = useState(errorProps || '');

	const onValidation = () => {
		if (validation) {
			const valid = validation(valueProps);
			if (valid === '') {
				setError('');
			} else {
				setError(valid);
			}

			return valid;
		}

		return '';
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = e.target.value;
		onChange(val);
		if (validationOnChange && validation) {
			onValidation();
		}
	};
	const isError = error !== '' && error !== undefined ? true : false;

	return (
		<div className={'select-form-control ' + className}>
			{label && (
				<label className="select-form-control__label" htmlFor={id}>
					{label}
				</label>
			)}
			<div
				className={`select-form-control__wrapper-input ${
					isError ? 'error' : ''
				} ${label ? 'select-form-control_label' : ''}`}
			>
				<select
					className={
						'select-form-control__input ' +
						classNameSelect +
						(black ? ' select-form-control_black' : '')
					}
					id={id}
					value={valueProps || options[0].value}
					onChange={onChangeInput}
					onBlur={onBlur}
					onFocus={onFocus}
					name={name}
				>
					{placeholder && placeholder !== '' && (
						<option value={`''`} disabled>
							{' '}
							{placeholder}{' '}
						</option>
					)}
					{options.map((item) => (
						<option key={item.value} value={item.value}>
							{item.name}
						</option>
					))}
				</select>
			</div>
			{
				<div className={`select-form-control__error ${isError ? 'error' : ''}`}>
					{error || ''}
				</div>
			}
		</div>
	);
};
