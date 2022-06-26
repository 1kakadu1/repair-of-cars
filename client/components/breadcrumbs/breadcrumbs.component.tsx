import React from 'react';
import Link from 'next/link';
import { IBreadcrumbsProps } from './breadcrumbs.model';

export const Breadcrumbs = ({
	links,
	className = '',
	hideHome = false,
}: IBreadcrumbsProps) => {
	return (
		<div className={'breadcrumbs' + className}>
			{!hideHome && (
				<div className="breadcrumbs__item">
					<Link href={'/'}>
						<a className={'breadcrumbs__link'}>Главная</a>
					</Link>
					<div className="breadcrumbs__separator">
						<svg
							viewBox="0 0 8 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g opacity="0.5">
								<path
									d="M6.89225 6.47782L1.49933 11.5465C1.15628 11.8691 0.600075 11.8691 0.257187 11.5465C-0.085729 11.2242 -0.085729 10.7014 0.257187 10.3792L5.02909 5.89414L0.257326 1.40928C-0.0855903 1.08684 -0.0855903 0.564139 0.257326 0.24183C0.600242 -0.08061 1.15642 -0.08061 1.49947 0.24183L6.89239 5.3106C7.06385 5.47183 7.14948 5.68292 7.14948 5.89412C7.14948 6.10541 7.06368 6.31666 6.89225 6.47782Z"
									fill="black"
								/>
							</g>
						</svg>
					</div>
				</div>
			)}
			{links.map((item, index) => {
				if (item.href !== undefined) {
					return (
						<div key={item.href} className="breadcrumbs__item">
							<Link href={item.href}>
								<a className={'breadcrumbs__link'}>{item.name}</a>
							</Link>
							<div className="breadcrumbs__separator">
								<svg
									viewBox="0 0 8 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g opacity="0.5">
										<path
											d="M6.89225 6.47782L1.49933 11.5465C1.15628 11.8691 0.600075 11.8691 0.257187 11.5465C-0.085729 11.2242 -0.085729 10.7014 0.257187 10.3792L5.02909 5.89414L0.257326 1.40928C-0.0855903 1.08684 -0.0855903 0.564139 0.257326 0.24183C0.600242 -0.08061 1.15642 -0.08061 1.49947 0.24183L6.89239 5.3106C7.06385 5.47183 7.14948 5.68292 7.14948 5.89412C7.14948 6.10541 7.06368 6.31666 6.89225 6.47782Z"
											fill="black"
										/>
									</g>
								</svg>
							</div>
						</div>
					);
				}
				return (
					<div className="breadcrumbs__item" key={index}>
						<div className="breadcrumbs__link breadcrumbs_link-disable">
							{item.name}
						</div>
					</div>
				);
			})}
		</div>
	);
};
