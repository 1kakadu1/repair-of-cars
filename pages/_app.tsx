import '../styles/globals.scss';
import '../styles/_app.css';

import type { AppProps } from 'next/app';
import { useState } from 'react';
import NotificationContext, {
	NotificationStatus,
} from '../client/components/notification-bar/notification-bar.context';
import { NotificationBar } from '../client/components/notification-bar/notification-bar.component';
import { store, wrapper } from '../client/store/state';
import { ModalCart } from '../client/components/modal-cart/modal-cart.component';
import { FavoriteModal } from '../client/components/favorite/favorite.component';
import { intPropsServices } from '../services/init-props';

function MyApp({ Component, pageProps }: AppProps) {
	const [notification, setNotification] = useState({
		message: '',
		status: NotificationStatus.success,
	});
	const contextValue = { notification, updateNotification: setNotification };
	return (
		<NotificationContext.Provider value={contextValue}>
			<Component {...pageProps} />
			<NotificationBar />
			<ModalCart portal />
			<FavoriteModal portal />
		</NotificationContext.Provider>
	);
}
//TODO: заменить any для ctx и Componentж
MyApp.getInitialProps = wrapper.getInitialAppProps(
	(store) =>
		async ({ ctx, Component }: { Component: any; ctx: any }) => {
			const pageProps = Component.getInitialProps
				? await Component.getInitialProps(ctx)
				: {};
			await intPropsServices.getCategory(store);
			return { ...pageProps };
		}
);

export default wrapper.withRedux(MyApp);
