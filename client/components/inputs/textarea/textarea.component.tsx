import React, { useState } from 'react';
import { ITextareaProps } from './textarea.model';
import { useDebounce } from '../../../hooks/useDebounce';
import { useEffect } from 'react';

export const TextareaDefault = ({
	value: valueProps,
	label,
	id,
	placeholder = '',
	onChange,
	onSubmit,
	className = '',
	classNameInput = '',
	error: errorProps,
	validation,
	validationOnChange,
	write,
	debounce = false,
	...props
}: ITextareaProps) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(errorProps || '');
	const onValidation = () => {
		if (validation) {
			const valid = validation(valueProps || value);
			if (valid === '') {
				setError('');
			} else {
				setError(valid);
			}

			return valid;
		}

		return '';
	};

	const debounceFn = useDebounce(onValidation, 300);

	const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		if (valueProps !== undefined && onChange) {
			onChange(e);
		} else {
			setValue(val);
		}

		if (validationOnChange && validation) {
			debounce ? debounceFn(null) : onValidation();
		}
	};
	const isError = error !== '' && error !== undefined ? true : false;

	useEffect(() => {
		if (errorProps !== undefined) setError(errorProps);
	}, [errorProps]);

	return (
		<div className={'textarea-form-control ' + className}>
			{label && (
				<label className="textarea-form-control__label" htmlFor={id}>
					{label}
				</label>
			)}
			<div
				className={`textarea-form-control__wrapper-input ${
					isError ? 'error' : ''
				}`}
			>
				<textarea
					className={
						'textarea-form-control__input ' +
						classNameInput +
						(write ? ' textarea-form-control_write' : '')
					}
					onChange={onChangeInput}
					value={valueProps ? valueProps : value}
					placeholder={placeholder}
					id={id}
					{...props}
				/>
			</div>
			{
				<div
					className={`textarea-form-control__error ${isError ? 'error' : ''}`}
				>
					{error || ''}
				</div>
			}
		</div>
	);
};
