import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { AsideProduct } from '../../client/components/aside/aside-product/aside-product.component';
import { Box } from '../../client/components/box/box.component';
import { Breadcrumbs } from '../../client/components/breadcrumbs/breadcrumbs.component';
import { ContainerAside } from '../../client/components/container-aside/container-aside.component';
import { Container } from '../../client/components/container/container.component';
import { ProductsGrid } from '../../client/components/products/products.component';
import { toProductsSelector } from '../../client/store/reducer/products/products.selector';
import { wrapper } from '../../client/store/state';
import cl from './product.module.scss';
import { useContext, useEffect } from 'react';
import NotificationContext, {
	NotificationStatus,
} from '../../client/components/notification-bar/notification-bar.context';
import { CallbackSection } from '../../client/components/sections/callback/callback-section.component';
import { Wrapper } from '../../client/components/wrapper/wrapper.component';
import { Loader } from '../../client/components/loader/loader.component';
import { intPropsServices } from '../../services/init-props';
import { PageLayout } from '../../client/components/layout/page/page.component';

const Products: NextPage = () => {
	const { updateNotification } = useContext(NotificationContext);
	const isLoading = useSelector(toProductsSelector.isLoading);
	const error = useSelector(toProductsSelector.error);

	useEffect(() => {
		if (error !== '') {
			updateNotification({
				message: 'Ошибка: ' + error,
				status: NotificationStatus.error,
			});
		}
	}, [error]);

	return (
		<div>
			<PageLayout
				head={{
					title: 'Список всех видов шин',
					description: 'Лучший сервис по работе с авто',
				}}
			>
				<Container>
					<Box styles={{ paddingTop: '20px' }} />
					<Breadcrumbs
						links={[
							{
								name: 'Продукты',
							},
						]}
					/>
					<div className={cl.page}>
						<ContainerAside
							aside={<AsideProduct />}
							content={<ProductsGrid />}
							sticky
							shadow
						/>
						<Loader loading={isLoading} />
					</div>
					<CallbackSection />
					<Box styles={{ paddingTop: '20px' }} />
					<Wrapper color="#F8F8F8">
						<h3>Что нужно знать, чтобы купить шины недорого</h3>
						<p>
							Купить шины для транспортного средства - процесс несложный, но
							занимающий много времени, если не использовать интернет-ресурсы.
							Магазин шин Колеса Даром в Саранске поможет вам сделать его легким
							и быстрым. Существующие типы (зимние шины, летние шины и
							внедорожные) различаются по составу резиновой смеси, конструкции и
							дизайну протектора. Именно от рисунка покрышки зависит ее износ,
							управляемость машины и степень комфортности при езде (вибрация и
							шум).
						</p>
						<p>
							Шины летние ценятся по степени сцепления с мокрой дорогой и
							скорости удаления воды из пятна контакта. Продуманный рисунок и
							определенная мягкость протектора позволяют повысить управляемость
							машины и износостойкость покрышек. Но эта резина абсолютно не
							подходит для зимы - она замерзает, твердеет и скользит на ледяной
							дороге. При ее производстве должны использоваться технологии,
							защищающие диск и ходовую часть при ударах и уменьшающие тормозной
							путь. Шины зимние имеют более рельефный рисунок (так называемые
							шины-липучки или шипы для безопасной езды по льду. Они остаются
							мягкими при отрицательной температуре благодаря оптимальному
							химическому составу резиновой смеси.
						</p>
						<p>
							Выгоднее всего шины купить в интернет-магазине Колеса Даром. При
							помощи удобного фильтра вы сможете подобрать резину по сезону,
							бренду, типоразмеру шины или типу автомобиля. Обширный каталог и
							приятные цены сделают процесс выбора еще более увлекательным.
							Подбор шин по марке автомобиля, например, позволяет без лишних
							усилий (выбрав только марку своего авто) сделать запрос, после
							чего система предоставит все возможные варианты покрышек,
							максимально подходящие вашей машине. Сравнив характеристики и
							цены, вы сможете сделать осознанный и правильный выбор.
						</p>
					</Wrapper>
					<Box styles={{ paddingTop: '20px' }} />
				</Container>
			</PageLayout>
		</div>
	);
};

Products.getInitialProps = wrapper.getInitialPageProps(
	(store) => async (context) => {
		const { query } = context;
		const page =
			query['page'] && !Array.isArray(query['page'])
				? parseInt(query['page'])
				: 1;

		await intPropsServices.getProducts(store, query, page);
	}
);

export default Products;
