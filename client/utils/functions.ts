export function debounce<A = unknown, R = void>(
	fn: (args: A) => R,
	ms: number
): [(args: A) => Promise<R>, () => void] {
	let timer: NodeJS.Timeout;

	const debouncedFunc = (args: A): Promise<R> =>
		new Promise((resolve) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				resolve(fn(args));
			}, ms);
		});

	const teardown = () => clearTimeout(timer);

	return [debouncedFunc, teardown];
}

export const newArray = (length: number) => {
	let arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(i);
	}
	return arr;
};

export const parseDate = (value?: string | null | Date) => {
	const date = value ? new Date(value) : new Date();
	const day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
	const month =
		date.getMonth() + 1 < 10
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1;
	const hour = date.getHours();
	const min = date.getMinutes();
	return {
		date,
		day,
		month,
		hour,
		min,
		year: date.getFullYear(),
	};
};
