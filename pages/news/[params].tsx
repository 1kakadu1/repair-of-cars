import type { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '../../client/components/box/box.component';
import { CardPost } from '../../client/components/cards/card-post/card-post.compoent';
import { Container } from '../../client/components/container/container.component';
import { Footer } from '../../client/components/footer/footer';
import { Header } from '../../client/components/header/header.component';
import { Loader } from '../../client/components/loader/loader.component';
import { Pagination } from '../../client/components/pagination/pagination.component';
import { newsSelector } from '../../client/store/reducer/news/news.selector';
import { wrapper } from '../../client/store/state';
import { intPropsServices } from '../../services/init-props';
import Router, { useRouter } from 'next/router';
import { Title } from '../../client/components/title/title';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { SubscribeSection } from '../../client/components/sections/subscribe-section/subscribe-section.component';
import { fetchNewsList } from '../../client/store/reducer/news/news.reducer';
import cl from './news.module.scss';

const News: NextPage = () => {
	const dispatch = useDispatch();
	const { isLoading, error, news, total, options } = useSelector(newsSelector);
	const { query } = useRouter();
	const page =
		query.params &&
		query.params[0] &&
		typeof Number(query.params[0]) === 'number'
			? Number(query.params[0])
			: 1;

	const onChangePagination = (page: number) => {
		Router.push({
			pathname: '/news/' + page,
		});
		dispatch(
			fetchNewsList({
				options: {
					limit: options.limit,
					offset: options.limit * (page - 1),
					orderBy: options.orderBy || 'asc',
				},
			}) as any
		);
	};
	return (
		<div>
			<Head>
				<title>Последние новости</title>
				<meta name="description" content="Последние новости" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Container>
				<Box styles={{ paddingTop: '20px' }} />
				<Breadcrumbs
					links={[
						{
							name: 'Новости и статьи',
						},
					]}
				/>
				<Title title="Новости и статьи" size={40} />
				<div className={cl.newsPage}>
					<div className={`container__row`}>
						{news.map((item) => (
							<div
								className={`container__col-12 container__col-md-6 container__col-xl-4 col-md-stretch`}
								key={item.id}
							>
								<CardPost<any> href="post" data={item} />
							</div>
						))}
					</div>

					<div className={cl.newsPagePagination}>
						<Pagination
							count={total}
							limit={options.limit}
							page={Number(page)}
							onChange={onChangePagination}
						/>
					</div>
				</div>
			</Container>
			<SubscribeSection />
			<Loader loading={isLoading} opacity={false} />
			<Footer />
		</div>
	);
};

News.getInitialProps = wrapper.getInitialPageProps(
	(store) => async (context) => {
		const { query } = context;
		const page =
			query['params'] && !Array.isArray(query['params'])
				? parseInt(query['params'])
				: 1;
		await intPropsServices.getNews(store, page, query);
		await intPropsServices.getCategory(store);
	}
);

export default News;
