import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IModalProps } from './modal.model';
import { PortalWrapper } from '../portal-wrapper/portal-wrapper.container';

export const Modal = ({ children, open, onClose, className }: IModalProps) => {
	const nodeRef = useRef(null);

	useEffect(() => {
		const closeOnEscapeKey = (e: { key: string }) =>
			e.key === 'Escape' ? onClose() : null;
		const body = document.body;
		body.addEventListener('keydown', closeOnEscapeKey);

		return () => {
			body.style.overflow = '';
			body.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [onClose]);

	useEffect(() => {
		const body = document.body;
		if (open) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = '';
		}
	}, [open]);

	return (
		<PortalWrapper wrapperId="react-portal-modal-container">
			<CSSTransition
				in={open}
				timeout={300}
				unmountOnExit
				classNames="modal"
				nodeRef={nodeRef}
			>
				<div
					className={'modal' + (className ? ' ' + className : '')}
					ref={nodeRef}
				>
					<div className="modal-overlay" onClick={onClose}></div>
					<div className="modal-content">
						<button onClick={onClose} className="btn-close">
							<svg focusable="false" viewBox="0 0 24 24">
								<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
							</svg>
						</button>
						{children}
					</div>
				</div>
			</CSSTransition>
		</PortalWrapper>
	);
};
