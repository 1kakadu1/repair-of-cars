import { SliderProps } from 'rc-slider';

export interface IRangeProps {
	className?: string;
	sliderProps?: SliderProps;
	value: number[];
	onChange: (value: number[]) => void;
}
