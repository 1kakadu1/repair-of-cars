import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { RoutsPath } from '../@types';
import { Container } from '../client/components/container/container.component';
import { Footer } from '../client/components/footer/footer';
import { Header } from '../client/components/header/header.component';
import { SectionProducts } from '../client/components/sections/popular-products/popular-products.component';
import { PostSection } from '../client/components/sections/popular-services/popular-services.component';
import { SectionSliderInfo } from '../client/components/sections/slider-item-info/slider-item-info.component';
import { TextInfo } from '../client/components/sections/text-info/text-info.component';
import { useTypedSelector } from '../client/hooks/useTypedSelector';
import { IHomeState } from '../client/store/reducer/home/home.model';
import { fetchHome } from '../client/store/reducer/home/home.reducer';
import { wrapper } from '../client/store/state';
import { createTabsDataPopularProduct } from '../client/utils/popular.utils';
import { intPropsServices } from '../services/init-props';

const Home: NextPage = (props) => {
	const { services, products, news, error, isLoading, isHydrate } =
		useTypedSelector<IHomeState>((state) => state.home);
	const popular = useMemo(() => {
		return createTabsDataPopularProduct(products.popular, ['category-tire']);
	}, [products]);

	useEffect(() => {
		if (products.all.length === 0) {
			fetchHome({});
		}
	}, []);

	return (
		<div>
			<Head>
				<title>Лучший сервис по работе с авто</title>
				<meta name="description" content="Лучший сервис по работе с авто" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />

			<SectionSliderInfo
				slides={[
					{
						title: 'Лучшая работа по установке и замение дисков',
						preview: '/img/slide-2.jpg',
					},
					{
						title: 'Шиномонтаж и доставка бесплатно',
						preview: '/img/slide-1.png',
					},
				]}
			/>

			<PostSection
				posts={services}
				error={error}
				loading={isLoading}
				href={'/services'}
			/>

			<SectionProducts
				title="Популярные шины"
				products={popular.tabs}
				tabsLabel={popular.labels.map(({ label, slug, id }, index) => ({
					id: index,
					label,
					slug,
					sectionId: id,
				}))}
			/>

			<SectionProducts
				title="Новое асортупление"
				products={products.all}
				link={{
					href:
						RoutsPath.products + '/1' + `?category={"category-tire":"tires"}`,
					title: 'Смотреть все',
				}}
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

			<PostSection
				title="Акции"
				posts={news}
				error={error}
				loading={isLoading}
				href={RoutsPath.news_single}
				hrefMore={RoutsPath.news_to_page}
			/>

			<Container>
				<TextInfo
					preview="/img/info-1.png"
					title="Шинный центр — один из самых крупных магазинов по продаже шин и дисков"
					link="/about"
				>
					<p className="description">
						Если вы хотите правильно купить шины , то должны знать об основных
						параметрах подбора покрышек. Главное — ориентироваться на
						информацию, указанную в маркировке.
					</p>
					<p className="description">
						Наша сеть — официальный дилер многих ведущих производителей, у нас
						вы можете купить шины и диски с полноценной гарантией на весь срок
						эксплуатации.
					</p>
				</TextInfo>
			</Container>

			<Footer />
		</div>
	);
};

Home.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
	await intPropsServices.getCategory(store);
	await intPropsServices.getHome(store);
});

export default Home;
