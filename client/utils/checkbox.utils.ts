export const onChangeCheckbox = <T>(
	checkboxObject: { [key: string]: string },
	key: T,
	update: (key: T, obj: { [key: string]: string }) => void,
	id: string,
	checked: boolean,
	value?: string
) => {
	const obj = JSON.parse(JSON.stringify(checkboxObject));
	if (obj[id] !== undefined) {
		delete obj[id];
	} else {
		obj[id] = value;
	}
	update(key, obj);
};

export function toggleSelectedItems<T = string>({
	list,
	item,
	index,
}: {
	list: T[];
	item: T;
	index: number;
}): T[] {
	let newSelected: T[] = [];

	if (index === -1) {
		newSelected = newSelected.concat(list, item);
	} else if (index === 0) {
		newSelected = newSelected.concat(list.slice(1));
	} else if (index === list.length - 1) {
		newSelected = newSelected.concat(list.slice(0, -1));
	} else if (index > 0) {
		newSelected = newSelected.concat(
			list.slice(0, index),
			list.slice(index + 1)
		);
	}

	return newSelected;
}

export function isItemInList<T>(list: T[], value: T) {
	return list.includes(value);
}
