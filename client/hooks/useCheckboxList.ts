import React, { useEffect, useState } from 'react';
import { toggleSelectedItems } from '../utils/checkbox.utils';

export function useCheckboxList(
	data: { id: string; [key: string]: any }[],
	initialValue: string[] = []
) {
	const [selected, setSelected] = useState<string[]>(initialValue);
	const onSelect = (id: string) => {
		setSelected(
			toggleSelectedItems({
				list: selected,
				item: id,
				index: selected.indexOf(id),
			})
		);
	};
	const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = data.map(({ id }) => id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};
	const resetList = () => {
		setSelected(initialValue);
	};

	useEffect(() => {
		if (data.length > 0) {
			const newSelected = selected.filter((id) =>
				data.some((item) => item.id === id)
			);

			setSelected(newSelected);
		}
	}, [data]);

	return { selected, setSelected, onSelectAll, onSelect, resetList };
}
