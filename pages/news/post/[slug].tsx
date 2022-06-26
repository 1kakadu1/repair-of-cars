import { useEffect } from 'react';
import type { NextPage, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '../../../client/components/box/box.component';
import { Container } from '../../../client/components/container/container.component';
import { Footer } from '../../../client/components/footer/footer';
import { Header } from '../../../client/components/header/header.component';
import { Loader } from '../../../client/components/loader/loader.component';
import { AppDispatch } from '../../../client/store/state';
import { Title } from '../../../client/components/title/title';
import { Breadcrumbs } from '../.././../client/components/breadcrumbs/breadcrumbs.component';
import { SubscribeSection } from '../../../client/components/sections/subscribe-section/subscribe-section.component';
import { INewsSingleReqData } from '../../../@types';
import { apiService } from '../../../services/api';
import { PostSection } from '../../../client/components/sections/popular-services/popular-services.component';
import { categorySelector } from '../../../client/store/reducer/category/category.selector';
import { fetchCategoryList } from '../../../client/store/reducer/category/category.reducer';
import { parseDate } from '../../../client/utils/functions';
import { BASE_PATH } from '../../../client/const/setting';
import Image from 'next/image';
import notFound from '../../../client/assets/images/not-found-full.png';
import cl from '../news.module.scss';
import editorCl from '../../../styles/modules/editor.module.scss';

interface INewsSingleProps {
	isLoading?: boolean;
	error?: string;
	post: INewsSingleReqData | null;
}

const NewsSingle: NextPage<INewsSingleProps> = ({
	isLoading = false,
	error = '',
	post,
}) => {
	const { news } = post || {};
	const dispatch = useDispatch<AppDispatch>();
	const { category } = useSelector(categorySelector);
	const createDate = parseDate(news?.createdAt);
	const tags =
		news?.tags !== undefined &&
		news?.tags !== null &&
		Array.isArray(JSON.parse(news.tags))
			? (JSON.parse(news.tags) as string[])
			: undefined;
	const preview =
		news?.previewFull === '' || news?.previewFull === undefined
			? notFound
			: news.previewFull;

	useEffect(() => {
		if (category.length === 0) {
			dispatch(fetchCategoryList({}));
		}
	}, []);

	if (news === undefined) {
		return (
			<div>
				<Container>
					<Title title={'Такой новоcти нет'} size={40} />
				</Container>
			</div>
		);
	}

	return (
		<div>
			<Head>
				<title>Новости: {news.title}</title>
				<meta name="description" content="Последние новости" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Container>
				<>
					<Box styles={{ paddingTop: '20px' }} />
					<Breadcrumbs
						links={[
							{
								name: 'Новости и статьи',
								href: '/news',
							},
							{
								name: news?.title || '',
							},
						]}
					/>
					<Title title={news?.title || ''} size={40} />

					<div className={cl.newsSingleHeader}>
						<div className={cl.newsSingleDateContainer}>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM8.5 7.79289V4H7.5V8.20711L9.64645 10.3536L10.3536 9.64645L8.5 7.79289Z"
									fill="#6A6A6A"
								/>
							</svg>
							<span className={cl.newsSingleDate}>
								{`${createDate.day}.${createDate.month}.${createDate.year}`}
							</span>
						</div>

						{tags && (
							<ul className={cl.newsSingleTags}>
								{tags.map((item, index) => (
									<li className={cl.newsSingleTagsItem} key={index}>
										{item}
									</li>
								))}
							</ul>
						)}
					</div>

					<div className={cl.newsSingleBody}>
						<div className={cl.newsSinglePreview}>
							<Image
								layout="fill"
								src={preview}
								alt={news.title}
								objectFit="cover"
								objectPosition="center"
							/>
						</div>
						<div
							className={`${editorCl.editorDescription} ${cl.newsSingleDescription}`}
							dangerouslySetInnerHTML={{ __html: news.description }}
						/>
					</div>

					{post && post?.similar && (
						<PostSection
							title="Последние новости"
							posts={post?.similar}
							href={BASE_PATH + 'news/post'}
						/>
					)}
				</>
			</Container>
			<SubscribeSection />
			<Loader loading={isLoading} opacity={false} />
			<Footer />
		</div>
	);
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: INewsSingleProps }> {
	const slug = context.query['slug'] || '';
	const data = await apiService.get<INewsSingleReqData>('news/' + slug);
	return {
		props: {
			post: data.data || null,
			isLoading: false,
			error: data.error || '',
		},
	};
}

export default NewsSingle;
