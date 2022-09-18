import Link from 'next/link';
import { useState } from 'react';
import { RoutsPath } from '../../../../@types';
import { useCart } from '../../../hooks/useCart';
import { Box } from '../../box/box.component';
import { ButtonDefault } from '../../buttons/default/default.component';
import { Checkbox } from '../../inputs/checkbox/checkbox.component';
import { TextItems } from '../../text-item/text-item.component';
import { ICardOrderProps } from './card-order.model';
import cl from './card-order.module.scss';

export const CardOrder = ({
	className = '',
	onSubmit,
	disabled,
}: ICardOrderProps) => {
	const { totalPrice } = useCart();
	const [isEmail, setIsEmail] = useState(false);
	const [isPolicy, setIsPolicy] = useState(false);
	return (
		<Box styles={{ padding: '18px' }}>
			<div className={className}>
				<TextItems
					title=""
					items={[
						{
							label: 'Стоимость',
							value: totalPrice.toString().replace('.', ','),
						},
						{
							label: 'Скидка',
							value: 0,
						},
						{
							label: 'Итоговая цена',
							value: totalPrice.toString().replace('.', ','),
						},
					]}
				/>

				<Checkbox
					id={'email-id'}
					label={
						<span className={cl.cardLabel}>
							{' '}
							Я согласен получать новости об акциях и новинках интернет магазина
						</span>
					}
					checked={isEmail}
					onChange={(value) => setIsEmail(value)}
				/>

				<Checkbox
					id={'policy'}
					label={
						<span className={cl.cardLabel}>
							{' '}
							Я согласен с{' '}
							<Link href={RoutsPath.policy}>
								<a className={cl.cardLabelLink}>условиями публичной оферты</a>
							</Link>
							и правилами продажи товаров
						</span>
					}
					checked={isPolicy}
					onChange={(value) => setIsPolicy(value)}
				/>

				<ButtonDefault
					disabled={disabled}
					onClick={() => onSubmit(isEmail, isPolicy)}
				>
					Оплатить
				</ButtonDefault>
			</div>
		</Box>
	);
};
