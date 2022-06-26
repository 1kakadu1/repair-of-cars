import { ITitleProps } from './title.model';
import styles from './title.module.scss';

export const Title = ({ title, center, size = 16 }: ITitleProps) => (
	<h1
		className={`${styles.title} ${center ? ' ' + styles.titleCenter : ''} ${
			styles['titleSize' + size]
		}`}
	>
		{title}
	</h1>
);
