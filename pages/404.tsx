import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ButtonDefault } from '../client/components/buttons/default/default.component';
import { Container } from '../client/components/container/container.component';
import { PageLayout } from '../client/components/layout/page/page.component';
import { fetchCategoryList } from '../client/store/reducer/category/category.reducer';
import { categorySelector } from '../client/store/reducer/category/category.selector';
import { useAppDispatch } from '../client/store/state';
import cl from '../styles/modules/not_found.module.scss';

export default function FourOhFour() {
	const dispatch = useAppDispatch();
	const { category } = useSelector(categorySelector);

	useEffect(() => {
		if (category.length === 0) {
			dispatch(fetchCategoryList({}));
		}
	}, []);

	return (
		<PageLayout
			head={{
				title: '404',
				description: 'Error 404! Page not found',
			}}
		>
			<div className={cl.notFound}>
				<Container>
					<div className={cl.notFound}>
						<p className={cl.notFoundDesc}>Пшш…Страница не найдена</p>
						<svg
							className={cl.notFoundIcon}
							width="276"
							height="127"
							viewBox="0 0 276 127"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M168.921 0L160.922 14.5L162.422 13.5L171.921 1L168.921 0ZM158.422 14.5L159.422 3.5L162.422 4.5L158.922 14L158.422 14.5ZM105.947 120C108.839 120 110.343 115.982 108.573 113.696C108.08 113.059 107.605 112.4 107.146 111.72C103.84 106.814 101.387 100.787 99.7874 93.6404C98.1876 86.4937 97.3877 78.3337 97.3877 69.1604C97.3877 60.0937 98.1876 51.9871 99.7874 44.8404C101.387 37.5871 103.84 31.507 107.146 26.6004C110.453 21.6937 114.666 17.9604 119.785 15.4004C124.904 12.7337 130.93 11.4004 137.863 11.4004C151.727 11.4004 161.913 16.4671 168.419 26.6004C175.031 36.7337 178.337 50.9204 178.337 69.1604C178.337 87.4004 175.031 101.587 168.419 111.72C168.006 112.364 167.578 112.987 167.135 113.589C165.411 115.935 166.962 120 169.873 120C171.556 120 172.921 121.365 172.921 123.048V123.5C172.921 125.433 171.354 127 169.421 127H106.429C104.496 127 102.929 125.433 102.929 123.5V123.018C102.929 121.351 104.281 120 105.947 120ZM147.621 109.32C144.955 110.814 141.702 111.56 137.863 111.56C134.023 111.56 130.717 110.814 127.944 109.32C125.277 107.72 123.091 105.48 121.385 102.6C119.678 99.7204 118.452 96.3071 117.705 92.3604C116.959 88.3071 116.585 83.8271 116.585 78.9204V59.4004C116.585 54.4937 116.959 50.067 117.705 46.1204C118.452 42.067 119.678 38.6004 121.385 35.7204C123.091 32.8404 125.277 30.6537 127.944 29.1604C130.717 27.5604 134.023 26.7604 137.863 26.7604C141.702 26.7604 144.955 27.5604 147.621 29.1604C150.394 30.6537 152.634 32.8404 154.34 35.7204C156.047 38.6004 157.273 42.067 158.02 46.1204C158.767 50.067 159.14 54.4937 159.14 59.4004V78.9204C159.14 83.8271 158.767 88.3071 158.02 92.3604C157.273 96.3071 156.047 99.7204 154.34 102.6C152.634 105.48 150.394 107.72 147.621 109.32ZM163.922 14.5L173.421 6L174.42 10L163.922 14.5ZM138.925 69C138.925 80.0457 134.672 89 129.426 89C124.408 89 124.416 80.8063 124.426 70.4263C124.426 69.9552 124.427 69.4796 124.427 69C124.427 68.7694 124.427 68.5397 124.427 68.3109L124.426 67.5737C124.416 57.1937 124.408 49 129.426 49C134.672 49 138.925 57.9543 138.925 69ZM51.8335 103.24V125H68.9513V103.24H84.1494V89.0003H68.9513V13.3203H45.2743L0 87.7203V103.24H51.8335ZM51.8335 89.0003H15.358L50.7136 29.8003H51.8335V89.0003ZM243.684 103.24V125H260.802V103.24H276V89.0003H260.802V13.3203H237.125L191.851 87.7203V103.24H243.684ZM243.684 89.0003H207.209L242.564 29.8003H243.684V89.0003Z"
								fill="#FF7E00"
							/>
						</svg>
						<ButtonDefault link="/" className={cl.notFoundLink}>
							Перейти на главную страницу
						</ButtonDefault>
					</div>
				</Container>
			</div>
		</PageLayout>
	);
}
