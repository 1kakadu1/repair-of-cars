import React from 'react';
import { ICounterProps } from './counter.model';
import cl from './counter.module.scss';

export const Counter = ({ count, onAdd, onSub, disableAdd }: ICounterProps) => {
	return (
		<div className={cl.counter}>
			<button
				className={`${cl.counter__btn} ${cl.counter__figure} counter-sub`}
				onClick={onSub}
			>
				-
			</button>
			<div className={`${cl.counter__count} ${cl.counter__figure}`}>{count}</div>
			<button
				className={`${cl.counter__btn} ${cl.counter__figure} counter-add`}
				onClick={onAdd}
				disabled={disableAdd}
			>
				+
			</button>
		</div>
	);
};
