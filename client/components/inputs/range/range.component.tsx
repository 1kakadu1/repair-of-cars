import React from 'react';
import Slider from 'rc-slider';
import { IRangeProps } from './range.model';
import { InputDefault } from '../input-default/input-default.component';

export const RangeSlider = ({
	value,
	onChange,
	className = '',
	sliderProps,
}: IRangeProps) => {
	const onChangeField = (values: number[] | number, index?: number) => {
		if (index !== undefined && typeof values === 'number') {
			const arr = [...value];
			arr[index] = values;
			onChange(arr);
		} else {
			onChange([...(values as number[])]);
		}
	};

	return (
		<div className={'range' + className}>
			<div className="range__inputs">
				<InputDefault
					classNameInput="range__input range__input_radius-left"
					id="price-min"
					type="number"
					write
					value={value[0]}
					min={sliderProps?.min}
					onChange={(e) => onChangeField(Number(e.target.value), 0)}
				/>
				<InputDefault
					classNameInput="range__input range__input_radius-right"
					id="price-max"
					type="number"
					value={value[1]}
					write
					max={sliderProps?.max}
					onChange={(e) => onChangeField(Number(e.target.value), 1)}
				/>
			</div>
			<Slider
				range
				value={value}
				onChange={(value) => onChangeField(value)}
				className={'range__slider'}
				{...sliderProps}
			/>
		</div>
	);
};
