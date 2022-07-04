import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { Box } from '../../client/components/box/box.component';
import { CardPost } from '../../client/components/cards/card-post/card-post.compoent';
import { Container } from '../../client/components/container/container.component';
import { Loader } from '../../client/components/loader/loader.component';
import { Pagination } from '../../client/components/pagination/pagination.component';
import { useAppDispatch, wrapper } from '../../client/store/state';
import { intPropsServices } from '../../services/init-props';
import { Title } from '../../client/components/title/title';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { SubscribeSection } from '../../client/components/sections/subscribe-section/subscribe-section.component';
import { fetchNewsList } from '../../client/store/reducer/news/news.reducer';
import cl from './services.module.scss';
import { PageLayout } from '../../client/components/layout/page/page.component';
import { servicesSelector } from '../../client/store/reducer/services/services.selector';
import { usePagination } from '../../client/components/pagination/usePagination.hook';

const Services: NextPage = () => {
	const dispatch = useAppDispatch();
	const { isLoading, services, total, options } = useSelector(servicesSelector);
	const { page, onPaginationChange } = usePagination({
		pathname: '/services',
		onChangePagination: (page: number) => {
			dispatch(
				fetchNewsList({
					options: {
						limit: options.limit,
						offset: options.limit * (page - 1),
						orderBy: options.orderBy || 'asc',
					},
				})
			);
		},
	});

	return (
		<div>
			<PageLayout
				head={{
					title: 'Наши сервисы и услуги',
					description: 'У нас присутствует множество различных услуг',
				}}
			>
				<>
					<Container>
						<Box styles={{ paddingTop: '20px' }} />
						<Breadcrumbs
							links={[
								{
									name: 'Услуги',
								},
							]}
						/>
						<Title title="Наши сервисы и услуги" size={40} />
						<div className={cl.newsPage}>
							<div className={`container__row`}>
								{services.map((item) => (
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
									onChange={onPaginationChange}
								/>
							</div>
						</div>
					</Container>
					<SubscribeSection />
					<Loader loading={isLoading} opacity={false} />
				</>
			</PageLayout>
		</div>
	);
};

Services.getInitialProps = wrapper.getInitialPageProps(
	(store) => async (context) => {
		const { query } = context;
		const page =
			query['params'] && !Array.isArray(query['params'])
				? parseInt(query['params'])
				: 1;
		await intPropsServices.getServices(store, page, query);
	}
);

export default Services;
