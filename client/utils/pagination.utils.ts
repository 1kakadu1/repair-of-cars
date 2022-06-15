export const range = (from: number, to: number, step = 1) => {
	let i = from;
	const range = [];

	while (i <= to) {
		range.push(i);
		i += step;
	}

	return range;
};

export const pageNumbers = ({
	currentPage,
	totalPages,
	pageNeighbours = 4,
}: {
	currentPage: number;
	totalPages: number;
	pageNeighbours: 0 | 1 | 2 | 3 | 4;
}) => {
	let LEFT_PAGE = false;
	let RIGHT_PAGE = false;
	const totalNumbers = pageNeighbours * 2 + 3;
	const totalBlocks = totalNumbers + 2;

	if (totalPages > totalBlocks) {
		const startPage = Math.max(2, currentPage - pageNeighbours);
		const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
		let pages = range(startPage, endPage);

		const hasLeftSpill = startPage > 2;
		const hasRightSpill = totalPages - endPage > 1;
		const spillOffset = totalNumbers - (pages.length + 1);

		switch (true) {
			case hasLeftSpill && !hasRightSpill: {
				const extraPages = range(startPage - spillOffset, startPage - 1);
				LEFT_PAGE = true;
				pages = [...extraPages, ...pages];
				break;
			}

			case !hasLeftSpill && hasRightSpill: {
				const extraPages = range(endPage + 1, endPage + spillOffset);
				RIGHT_PAGE = true;
				pages = [...pages, ...extraPages];
				break;
			}
			case hasLeftSpill && hasRightSpill:
			default: {
				LEFT_PAGE = true;
				RIGHT_PAGE = true;
				pages = [...pages];
				break;
			}
		}

		return { pages: [1, ...pages, totalPages], RIGHT_PAGE, LEFT_PAGE };
	}

	return { pages: range(1, totalPages), RIGHT_PAGE, LEFT_PAGE };
};
