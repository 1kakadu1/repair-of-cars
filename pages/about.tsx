import { NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '../client/components/box/box.component';
import { Breadcrumbs } from '../client/components/breadcrumbs/breadcrumbs.component';
import { Container } from '../client/components/container/container.component';
import { PageLayout } from '../client/components/layout/page/page.component';
import { SubscribeSection } from '../client/components/sections/subscribe-section/subscribe-section.component';
import { Title } from '../client/components/title/title';
import { fetchCategoryList } from '../client/store/reducer/category/category.reducer';
import { categorySelector } from '../client/store/reducer/category/category.selector';
import { useAppDispatch, wrapper } from '../client/store/state';
import { intPropsServices } from '../services/init-props';
import Image from 'next/image';
import editorCl from "../styles/modules/editor.module.scss";

const About: NextPage = (props) => {
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
				title: 'О нас',
				description: 'информация о нашей команде',
			}}
		>
			<>
				<Container>
					<div>
							<Box styles={{ paddingTop: '20px' }} />
							<Breadcrumbs
								links={[
									{
										name: "О компании",
									},
								]}
							/>
							<Title title='О компании' size={40} />

							<div className={editorCl.editorBody}>
								<div className={editorCl.editorPreview}>
									<Image
										layout="fill"
										src="/img/about.jpg"
										alt="О нас"
										objectFit="cover"
										objectPosition="center"
									/>
								</div>
								<Box styles={{ paddingTop: '20px' }} />
								<div
									className={`${editorCl.editorDescription}`}
								>
									<h2>Работаем с 2018 года</h2>

									<p>
										Чувствительность к командам водителя, а также устойчивость автомобиля гарантируют установленные под специальным уклоном к центру тяжести автомобиля грани средних ребер и элементов грунтозацепов. Широкие борозды в форме трапеции, которые покрывают внешний слой модели, помогают шине самоочищаться. Они сгоняют воду и грязь под шину, что также помогает не впитывать лишнюю влагу.
									</p>

									<h2>
										Основные ценности компании
									</h2>
									<p>
										При создании шины были применены следующие технологии:
										«3D Mod» — рисунок протектора создавался при помощи ручного 3D моделирования. Таким образом, разработчики заранее смогли увидеть все недочеты и устранить их;
										«Contact with road» — широкая площадь контакта шины с поверхностью достигается за счет скошенным формам и рисунку протектора;
										«Dissymmetric drawing» —отвод влаги к низу шины достигается при помощи асимметричного рисунка протектора, что дает хорошую управляемость при маневрировании.
									</p>
									<h2>
										Мы работаем для наших клиентов
									</h2>
									<p>
										При создании шины были применены следующие технологии:
										«3D Mod» — рисунок протектора создавался при помощи ручного 3D моделирования. Таким образом, разработчики заранее смогли увидеть все недочеты и устранить их;
										«Contact with road» — широкая площадь контакта шины с поверхностью достигается за счет скошенным формам и рисунку протектора;
										«Dissymmetric drawing» —отвод влаги к низу шины достигается при помощи асимметричного рисунка протектора, что дает хорошую управляемость при маневрировании.
									</p>
								</div>
							</div>
					</div>
				</Container>
				<SubscribeSection />
			</>
		</PageLayout>
	);
};

About.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
	await intPropsServices.getCategory(store);
	await intPropsServices.getHome(store);
});

export default About;
