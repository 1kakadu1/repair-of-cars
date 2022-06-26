import { INewsData, IServicesData } from '../../../../@types';
import { Box } from '../../box/box.component';
import { ButtonDefault } from '../../buttons/default/default.component';
import { CardPost } from '../../cards/card-post/card-post.compoent';
import { Container } from '../../container/container.component';
import { Title } from '../../title/title';
import { IPopularServices } from './popular-services.model';
import cl from './popular-services.module.scss';

export const PostSection = ({
	posts,
	error = '',
	loading = false,
	title = 'Популярные услуги',
	href,
	query = '',
	hrefMore,
}: IPopularServices) => {
	return (
		<section>
			<Container>
				<Title size={32} title={title} center />
				<Box styles={{ padding: '16px' }} />
				<>
					{error !== '' && <h3>{error}</h3>}
					{error === '' && posts.length > 0 && (
						<div className={cl.cards}>
							<div className="container__row">
								{posts.map((item: IServicesData | INewsData, index: number) => (
									<div
										className={`container__col-12 container__col-md-6 container__col-lg-4 col-md-stretch ${
											!((index + 1) % 3) ? cl.popularItemHide : ''
										}`}
										key={item.id}
									>
										<CardPost<any> data={item} href={href} />
									</div>
								))}
							</div>
							{hrefMore && (
								<div className={cl.cardsMore}>
									<ButtonDefault
										className={cl.cardsMoreBtn}
										outline
										link={hrefMore + query}
									>
										Посмотреть все услуги
									</ButtonDefault>
								</div>
							)}
						</div>
					)}
					{error === '' && posts.length === 0 && (
						<div className="h3">Empty</div>
					)}
				</>
			</Container>
		</section>
	);
};
