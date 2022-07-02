import type { GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { toProductsSelector } from '../../client/store/reducer/products/products.selector';
import { Box } from '../../client/components/box/box.component';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { Container } from '../../client/components/container/container.component';
import { Loader } from '../../client/components/loader/loader.component';
import { SectionProducts } from '../../client/components/sections/popular-products/popular-products.component';
import { TabsContainer } from '../../client/components/tabs/tabs.component';
import TabsContext from '../../client/components/tabs/tabs.context';
import { Title } from '../../client/components/title/title';
import { Rating } from '../../client/components/rating/rating.component';
import { productFieldIcon } from '../../client/utils/product.utils';
import {
	useWindowSize,
	WindowBreakpoints,
} from '../../client/hooks/useWindowSize';
import { Reviews } from '../../client/components/reviews/reviews.component';
import { TextItems } from '../../client/components/text-item/text-item.component';

import cl from './product.module.scss';
import empty from '../../client/assets/images/not-found.jpg';
import { CardActionProduct } from '../../client/components/cards/card-action-product/card-action-product.component';
import { apiService } from '../../services/api';
import {
	IProductData,
	IProductSimilarReqData,
	IProductSingleReqData,
	RoutsPath,
} from '../../@types';
import { useSimilarProducts } from '../../client/hooks/useSimilarProduts';
import { PageLayout } from '../../client/components/layout/page/page.component';

interface IProductSingleProps {
	isLoading?: boolean;
	error?: string;
	product: IProductSingleReqData | null;
}

const Product: NextPage<IProductSingleProps> = ({
	product,
	isLoading = true,
	error,
}) => {
	const [loading, setLoading] = useState<boolean>(isLoading);
	const { product: productItem } = product || {};
	const products = useSelector(toProductsSelector.products);
	const { query } = useRouter();
	const slug = Array.isArray(query.slug)
		? query.slug[0]
		: query.slug || 'unset';
	const initPage = useRef(false);
	const [refTabs, setTabsRef] = useState<any | null>(null);
	const [tab, setTab] = useState(0);
	const { width } = useWindowSize();

	const similar = useSimilarProducts({
		slug,
		limit: 4,
		offset: 0,
	});

	const itemsTth: { label: string; value: string | number }[] = useMemo(() => {
		return productItem
			? [
					{
						label: 'Модель',
						value: productItem.modelCar?.name || 'unset',
					},
					{
						label: 'Комлект',
						value: productItem.completeSet ? 'Да' : 'Нет',
					},
					{
						label: 'Производитель',
						value: productItem.manufacturers?.name || '',
					},
					{
						label: 'Топливная эффективность',
						value: productItem.fuelEfficiency?.name || '',
					},
					{
						label: 'Сезон',
						value: productItem.season?.name || '',
					},
					{
						label: 'Ур. вн. шума',
						value: productItem.externalNoiseLevel,
					},
					{
						label: 'Индекс нагрузки для сдвоенных',
						value: productItem.speedIndex?.name || '0',
					},
			  ]
			: [];
	}, [productItem]);

	useEffect(() => {
		setTab(0);
		if (initPage.current) {
			window.scrollTo(0, 0);
		} else {
			initPage.current = true;
		}
	}, [slug]);

	useEffect(() => {
		setLoading(false);
	}, []);

	const tabItems = [
		productItem ? (
			<div
				className={cl.pageDescription}
				dangerouslySetInnerHTML={{ __html: productItem.description }}
			/>
		) : (
			<div />
		),
		productItem ? (
			<div className="product__base-info">
				<TextItems title="Характеристики модели" items={itemsTth} />
			</div>
		) : (
			<div />
		),
		productItem ? (
			<div className="product__base-info">
				<Reviews reviews={productItem.comments} swiperRef={refTabs} />
			</div>
		) : (
			<div />
		),
	];

	return (
		<TabsContext.Provider
			value={{
				tabsRef: refTabs,
				setTabsRef,
			}}
		>
			<div>
				<PageLayout
					head={{
						title: productItem?.name || 'Лучший сервис по продаже шин',
						description: 'Лучший сервис по работе с авто',
					}}
				>
					<Container>
						<Box styles={{ paddingTop: '20px' }} />
						<Breadcrumbs
							links={[
								{
									name: 'Продукты',
									href: RoutsPath.products + '/1',
								},
								{
									name: productItem?.name || '',
								},
							]}
						/>

						{productItem ? (
							<div className={cl.page}>
								<div className={cl.pageHeader}>
									<Title title={productItem.name} size={40} />
									<div className={cl.pageHeaderBottom}>
										<div className={cl.pageHeaderIcons}>
											{productFieldIcon(productItem.seasonId, 'season')}
										</div>
										<div className={cl.cardProductHeaderComments}>
											<svg
												width="14"
												height="13"
												viewBox="0 0 14 13"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M4 3H10V4H4V3Z" fill="#6A6A6A" />
												<path d="M10 6H4V7H10V6Z" fill="#6A6A6A" />
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M4 10H14V0H0V13L4 10ZM1 11L3.66667 9H13V1H1V11Z"
													fill="#6A6A6A"
												/>
											</svg>
											<span className={cl.cardProductHeaderCommentsCount}>
												{productItem?.comments?.length || 0}
											</span>
										</div>
										<div className={cl.cardProductHeaderStars}>
											<Rating
												id={productItem.id}
												selected={productItem.rating}
												offChange
												width={width >= WindowBreakpoints.md ? 18 : 14}
											/>
										</div>
										<div className={cl.pageFieldCode}>
											Код товара: {productItem.code}
										</div>
									</div>

									<div className={cl.pageBody}>
										<div className={`container__row`}>
											<div
												className={`container__col-12 container__col-md-6  container__col-xl-4 ${cl.pageBodyPreview}`}
											>
												<Image
													layout="fill"
													src={
														productItem.preview === ''
															? empty
															: productItem.preview
													}
													alt={productItem.name}
													objectFit="contain"
													objectPosition="center"
												/>
											</div>
											{width >= WindowBreakpoints.xl && (
												<div
													className={`container__col-12 container__col-xl-4 ${cl.pageBodyInfo}`}
												>
													<TextItems
														title="Краткое описание"
														items={itemsTth}
													/>
												</div>
											)}

											<div
												className={`container__col-12 container__col-md-6 container__col-xl-4 ${cl.pageBodyCart}`}
											>
												<CardActionProduct product={productItem} />
											</div>
										</div>
									</div>
								</div>

								<div className={cl.pageTabs}>
									<TabsContainer
										labels={[
											{ label: 'Описание', id: 0 },
											{ label: ' Характеристики', id: 1 },
											{ label: 'Отзывы', id: 2 },
										]}
										items={tabItems}
										tab={tab}
										onChangeTab={setTab}
										update
									/>
								</div>
								{!similar.isLoading && similar.products.length === 0 ? (
									<SectionProducts
										title="Новое асортупление"
										products={products}
										swiperProps={{
											slidesPerView: 4,
											navigation: true,
											spaceBetween: 24,
											breakpoints: {
												320: {
													width: 320,
													slidesPerView: 'auto',
												},
												640: {
													width: 640,
													slidesPerView: 2,
												},
												996: {
													width: 996,
													slidesPerView: 3,
												},
												1280: {
													width: 1280,
													slidesPerView: 4,
												},
											},
										}}
									/>
								) : (
									<SectionProducts
										title="Похожие товары"
										products={similar.products}
										error={similar.error}
										loading={similar.isLoading}
									/>
								)}
							</div>
						) : (
							<Title title="404. Not Found product" size={40} />
						)}

						<Loader loading={loading} opacity={false} />
					</Container>
				</PageLayout>
			</div>
		</TabsContext.Provider>
	);
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: IProductSingleProps }> {
	const slug = context.query['slug'] || '';
	const data = await apiService.get<IProductSingleReqData>('products/' + slug);

	return {
		props: {
			product: data.data || null,
			isLoading: false,
			error: data.error || '',
		},
	};
}

export default Product;
