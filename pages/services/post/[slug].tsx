import type { NextPage, GetServerSidePropsContext } from 'next';
import { Box } from '../../../client/components/box/box.component';
import { Container } from '../../../client/components/container/container.component';
import { Loader } from '../../../client/components/loader/loader.component';
import { Title } from '../../../client/components/title/title';
import { Breadcrumbs } from '../.././../client/components/breadcrumbs/breadcrumbs.component';
import { SubscribeSection } from '../../../client/components/sections/subscribe-section/subscribe-section.component';
import { IServicesSingleReqData } from '../../../@types';
import { apiService } from '../../../services/api';
import { PostSection } from '../../../client/components/sections/popular-services/popular-services.component';
import { parseDate } from '../../../client/utils/functions';
import { BASE_PATH } from '../../../client/const/setting';
import Image from 'next/image';
import notFound from '../../../client/assets/images/not-found-full.png';
import cl from '../services.module.scss';
import editorCl from '../../../styles/modules/editor.module.scss';
import { PageLayout } from '../../../client/components/layout/page/page.component';

interface IServicesSingleProps {
	isLoading?: boolean;
	error?: string;
	post: IServicesSingleReqData | null;
}

const NewsSingle: NextPage<IServicesSingleProps> = ({
	isLoading = false,
	error = '',
	post,
}) => {
	const { services } = post || {};
	const createDate = parseDate(services?.createdAt);
	const preview =
		services?.previewFull === '' || services?.previewFull === undefined
			? notFound
			: services.previewFull;

	if (services === undefined) {
		return (
			<div>
				<Container>
					<Title title={'Сервис не найден'} size={40} />
				</Container>
			</div>
		);
	}

	return (
		<div>
			<PageLayout
				head={{
					title: 'Новости: ' + services.title,
					description: 'Последние новости',
				}}
			>
				<>
					<Container>
						<>
							<Box styles={{ paddingTop: '20px' }} />
							<Breadcrumbs
								links={[
									{
										name: 'Все сервисы',
										href: '/services/1',
									},
									{
										name: services?.title || '',
									},
								]}
							/>
							<Title title={services?.title || ''} size={40} />

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
							</div>

							<div className={cl.newsSingleBody}>
								<div className={cl.newsSinglePreview}>
									<Image
										layout="fill"
										src={preview}
										alt={services.title}
										objectFit="cover"
										objectPosition="center"
									/>
								</div>
								<div
									className={`${editorCl.editorDescription} ${cl.newsSingleDescription}`}
									dangerouslySetInnerHTML={{ __html: services.description }}
								/>
							</div>

							{post && post?.similar && (
								<PostSection
									title="Последние новости"
									posts={post?.similar}
									href={BASE_PATH + 'services/post'}
								/>
							)}
						</>
					</Container>
					<SubscribeSection />
					<Loader loading={isLoading} opacity={false} />
				</>
			</PageLayout>
		</div>
	);
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: IServicesSingleProps }> {
	const slug = context.query['slug'] || '';
	const data = await apiService.get<IServicesSingleReqData>('services/' + slug);
	return {
		props: {
			post: data.data || null,
			isLoading: false,
			error: data.error || '',
		},
	};
}

export default NewsSingle;
