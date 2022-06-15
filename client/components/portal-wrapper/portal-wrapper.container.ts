import React, { useState} from 'react';
import { createPortal } from 'react-dom';

export interface IPortalWrapper {
	children: JSX.Element;
	wrapperId: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperElement = document.createElement('div');
	wrapperElement.setAttribute('id', wrapperId);
	document.body.appendChild(wrapperElement);
	return wrapperElement;
}

export function PortalWrapper({
	children,
	wrapperId = 'react-portal-wrapper',
}: IPortalWrapper) {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
		null
	);
	const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
	useEnhancedEffect(() => {
		let element = document.getElementById(wrapperId);
		let systemCreated = false;

		if (!element) {
			systemCreated = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}
		setWrapperElement(element);

		return () => {
			if (systemCreated && element?.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);

	if (wrapperElement === null) return null;

	return createPortal(children, wrapperElement);
}
