import { money } from '../../../const/setting';
import { ICardCartProps } from './card-cart.model';
import cl from './card-cart.module.scss';
import Image from 'next/image';
import { OkIcon } from '../../icons/ok.icon';
import { Counter } from '../../counter/counter.component';
import { CloseIcon } from '../../icons/close.icon';
import Link from 'next/link';

export const CardCart = ({
	data,
	href,
	onAddItem,
	onSubItem,
	onRemoveItem,
	onClose,
}: ICardCartProps) => {
	const onAdd = () => (onAddItem ? onAddItem(data) : () => void 0);
	const onSub = () => (onSubItem ? onSubItem(data) : () => void 0);
	const onRemove = () => onRemoveItem && onRemoveItem(data.id);

	return (
		<div className={cl.cardCart}>
			{onRemoveItem && (
				<div className={cl.cardCartRemove} onClick={onRemove}>
					<CloseIcon className={cl.cardCartRemoveIcon} />
				</div>
			)}

			<div className={cl.cardCartPreview}>
				<Image
					layout="fill"
					src={data.preview}
					alt={data.title}
					objectFit="contain"
					objectPosition="center"
				/>
			</div>
			<div className={cl.cardCartBody}>
				<div className={cl.cardCartInfo}>
					{href ? (
						<Link href={href}>
							<a onClick={onClose} className={cl.cardCartName}>
								{data.title}
							</a>
						</Link>
					) : (
						<div className={cl.cardCartName}>{data.title}</div>
					)}

					<div className={cl.cardCartCode}>
						<span className={cl.cardCartCodeTitle}>Код товара: </span>
						{data.code}
					</div>
					<div className={cl.cardCartQuantity}>
						<OkIcon />

						<span className={cl.cardCartQuantityTitle}>
							В наличии {data.quantity}
						</span>
					</div>
				</div>
				<div className={cl.cardCartMoney}>
					{onAddItem && onSubItem && (
						<div className={cl.cardCartCounter}>
							<Counter
								count={data.count}
								onAdd={onAdd}
								onSub={onSub}
								disableAdd={data.count >= data.quantity}
							/>
						</div>
					)}

					<div className={cl.cardCartPrice}>
						{data.price} {money}
					</div>
				</div>
			</div>
		</div>
	);
};
