export interface IBreadcrumbsProps {
	className?: string;
	hideHome?: boolean;
	links: IBreadcrumbsLink[];
}

export interface IBreadcrumbsLink {
	href?: string;
	name: string;
}
