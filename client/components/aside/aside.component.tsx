import React from 'react';
import { IAsideGeneralProps } from './aside.model';

export const Aside = ({ className = '', children }: IAsideGeneralProps) => {
	return <aside className={'aside-general' + className}>{children}</aside>;
};
