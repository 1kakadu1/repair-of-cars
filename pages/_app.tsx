import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import NotificationContext, { NotificationStatus } from '../client/components/notification-bar/notification-bar.context';
import { NotificationBar } from '../client/components/notification-bar/notification-bar.component';
import { wrapper } from '../client/store/state';
import { ModalCart } from '../client/components/modal-cart/modal-cart.component';
import { FavoriteModal } from '../client/components/favorite/favorite.component';

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
  )
}

export default wrapper.withRedux(MyApp);
