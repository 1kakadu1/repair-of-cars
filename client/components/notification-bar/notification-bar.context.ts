import React from 'react';

export enum NotificationStatus {
	'success' = 'success',
	'info' = 'info',
	'warning' = 'warning',
	'error' = 'error',
}

export type Notification = { message: string; status: NotificationStatus };

const NotificationContext = React.createContext<{
	notification: Notification;
	updateNotification: (item: Notification) => void;
}>({
	notification: { message: '', status: NotificationStatus.success },
	updateNotification: (item: Notification) => void 0,
});

export default NotificationContext;
