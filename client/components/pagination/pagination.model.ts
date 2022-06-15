export interface IPaginationProps {
	count: number;
	page: number;
	limit?: number;
	className?: string;
	search?: string;
	onChange?: (page: number, limit?: number, search?: string) => void;
	paginationOffset?: 0 | 1 | 2 | 3 | 4;
}
