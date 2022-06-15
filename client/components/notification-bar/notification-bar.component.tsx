import React, { useContext, useEffect, useRef, useState } from 'react';
import NotificationContext, {
	NotificationStatus,
} from './notification-bar.context';
import { CSSTransition } from 'react-transition-group';

export const NotificationBar = () => {
	const [open, setOpen] = useState(false);
	const { notification } = useContext(NotificationContext);
	const refTimer = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (notification.message) {
			if (refTimer.current !== null) {
				clearTimeout(refTimer.current);
			}
			refTimer.current = setTimeout(() => {
				setOpen(false);
			}, 3000);
			setOpen(true);
		}
	}, [notification]);

	const handleClose = () => {
		setOpen(false);
		refTimer.current && clearTimeout(refTimer.current);
	};

	const handleMouseMove = () => {
		refTimer.current && clearTimeout(refTimer.current);
	};

	const handleMouseLeave = () => {
		refTimer.current = setTimeout(() => {
			setOpen(false);
		}, 3000);
	};

	const icon = () => {
		switch (notification.status) {
			case NotificationStatus.error:
				return (
					<svg viewBox="0 0 24 24">
						<path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
					</svg>
				);
			case NotificationStatus.success:
				return (
					<svg viewBox="0 0 24 24">
						<path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
					</svg>
				);
			case NotificationStatus.warning:
				return (
					<svg viewBox="0 0 24 24">
						<path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
					</svg>
				);
			case NotificationStatus.info:
				return (
					<svg viewBox="0 0 24 24">
						<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
					</svg>
				);
		}
	};

	return (
		<CSSTransition
			in={open}
			timeout={300}
			classNames="notification-bar"
			unmountOnExit
		>
			<div
				className={`notification-bar ${notification.status}`}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<div className="notification-bar__content">
					<div className="notification-bar__icon">{icon()}</div>
					<div className="notification-bar__msg">{notification.message}</div>
				</div>

				<button onClick={handleClose} className="notification-bar__button">
					<svg focusable="false" viewBox="0 0 24 24">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
					</svg>
				</button>
			</div>
		</CSSTransition>
	);
};
