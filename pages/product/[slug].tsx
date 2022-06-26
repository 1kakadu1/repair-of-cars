import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../client/store/state';
import {
	fetchProductBySlug,
	fetchProductSimilarList,
	toProductAction,
} from '../../client/store/reducer/product/product.reducer';
import { intPropsServices } from '../../services/init-props';
import { productSelector } from '../../client/store/reducer/product/product.selector';
import { toProductsSelector } from '../../client/store/reducer/products/products.selector';
import { RoutsPath } from '../../@types';

import { Box } from '../../client/components/box/box.component';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { Container } from '../../client/components/container/container.component';
import { Footer } from '../../client/components/footer/footer';
import { Header } from '../../client/components/header/header.component';
import NotificationContext from '../../client/components/notification-bar/notification-bar.context';
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

const Product: NextPage = () => {
	const { updateNotification } = useContext(NotificationContext);
	const dispatch = useDispatch();
	const { product, similar, isLoading } = useSelector(productSelector);
	const products = useSelector(toProductsSelector.products);
	const { query } = useRouter();
	const slug = Array.isArray(query.slug)
		? query.slug[0]
		: query.slug || 'unset';
	const initPage = useRef(false);
	const [refTabs, setTabsRef] = useState<any | null>(null);
	const [tab, setTab] = useState(0);
	const { width } = useWindowSize();

	const itemsTth: { label: string; value: string | number }[] = useMemo(() => {
		return product
			? [
					{
						label: 'Модель',
						value: product.modelCar?.name || 'unset',
					},
					{
						label: 'Комлект',
						value: product.completeSet ? 'Да' : 'Нет',
					},
					{
						label: 'Производитель',
						value: product.manufacturers?.name || '',
					},
					{
						label: 'Топливная эффективность',
						value: product.fuelEfficiency?.name || '',
					},
					{
						label: 'Сезон',
						value: product.season?.name || '',
					},
					{
						label: 'Ур. вн. шума',
						value: product.externalNoiseLevel,
					},
					{
						label: 'Индекс нагрузки для сдвоенных',
						value: product.speedIndex?.name || '0',
					},
			  ]
			: [];
	}, [product]);

	useEffect(() => {
		if (slug !== 'unset' && !Array.isArray(slug) && slug !== '') {
			const productStore = products.find((x) => x.slug === slug);

			if (productStore) {
				dispatch(
					toProductAction.setProduct({
						products: productStore,
					})
				);
			} else {
				dispatch(fetchProductBySlug({ slug }) as any);
			}

			if (!similar.isLoading) {
				dispatch(
					fetchProductSimilarList({
						body: { slug },
						options: { limit: 4, offset: 0 },
					}) as any
				);
			}
		}

		setTab(0);
		if (initPage.current) {
			window.scrollTo(0, 0);
		} else {
			initPage.current = true;
		}
	}, [slug]);

	useEffect(() => {
		dispatch(
			fetchProductSimilarList({
				body: { slug },
				options: { limit: 4, offset: 0 },
			}) as any
		);
		return () => {
			dispatch(toProductAction.clearProduct());
		};
	}, []);

	const tabItems = [
		product ? (
			<div
				className={cl.pageDescription}
				dangerouslySetInnerHTML={{ __html: product.description }}
			/>
		) : (
			<div />
		),
		product ? (
			<div className="product__base-info">
				<TextItems title="Характеристики модели" items={itemsTth} />
			</div>
		) : (
			<div />
		),
		product ? (
			<div className="product__base-info">
				<Reviews reviews={product.comments} swiperRef={refTabs} />
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
				<Head>
					<title>{product?.name || 'Лучший сервис по продаже шин'}</title>
					<meta name="description" content="Лучший сервис по работе с авто" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Header />
				<Container>
					<Box styles={{ paddingTop: '20px' }} />
					<Breadcrumbs
						links={[
							{
								name: 'Продукты',
								href: RoutsPath.products + '/1',
							},
							{
								name: product?.name || '',
							},
						]}
					/>

					{product ? (
						<div className={cl.page}>
							<div className={cl.pageHeader}>
								<Title title={product.name} size={40} />
								<div className={cl.pageHeaderBottom}>
									<div className={cl.pageHeaderIcons}>
										{productFieldIcon(product.seasonId, 'season')}
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
											{product?.comments?.length || 0}
										</span>
									</div>
									<div className={cl.cardProductHeaderStars}>
										<Rating
											id={product.id}
											selected={product.rating}
											offChange
											width={width >= WindowBreakpoints.md ? 18 : 14}
										/>
									</div>
									<div className={cl.pageFieldCode}>
										Код товара: {product.code}
									</div>
								</div>

								<div className={cl.pageBody}>
									<div className={`container__row`}>
										<div
											className={`container__col-12 container__col-md-6  container__col-xl-4 ${cl.pageBodyPreview}`}
										>
											<Image
												layout="fill"
												src={product.preview === '' ? empty : product.preview}
												alt={product.name}
												objectFit="contain"
												objectPosition="center"
											/>
										</div>
										{width >= WindowBreakpoints.xl && (
											<div
												className={`container__col-12 container__col-xl-4 ${cl.pageBodyInfo}`}
											>
												<TextItems title="Краткое описание" items={itemsTth} />
											</div>
										)}

										<div
											className={`container__col-12 container__col-md-6 container__col-xl-4 ${cl.pageBodyCart}`}
										>
											<CardActionProduct product={product} />
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

					<Loader loading={isLoading} opacity={false} />
				</Container>
				<Footer />
			</div>
		</TabsContext.Provider>
	);
};

Product.getInitialProps = wrapper.getInitialPageProps(
	(store) => async (context) => {
		const { query } = context;
		await intPropsServices.getCategory(store);
		await intPropsServices.getProduct(store, query);
	}
);

export default Product;
