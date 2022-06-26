import { NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../client/components/container/container.component';
import { PageLayout } from '../client/components/layout/page/page.component';
import { fetchCategoryList } from '../client/store/reducer/category/category.reducer';
import { categorySelector } from '../client/store/reducer/category/category.selector';
import { useAppDispatch, wrapper } from '../client/store/state';
import { intPropsServices } from '../services/init-props';

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
			<Container>
				<h1>О нас</h1>
			</Container>
		</PageLayout>
	);
};

About.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
	await intPropsServices.getCategory(store);
	await intPropsServices.getHome(store);
});

export default About;
