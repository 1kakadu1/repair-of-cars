import { ButtonDefault } from '../../buttons/default/default.component';
import Image from 'next/image';
import cl from './callback-section.module.scss';
import bg from '../../../assets/images/callback.png';
import { ModalCallback } from '../../modals/modal-callback/modal-callback.component';
import { useState } from 'react';

export const CallbackSection = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className={cl.container}>
			<div className={cl.bg}>
				<Image
					layout="fill"
					src={bg}
					alt=""
					objectFit="cover"
					objectPosition="center"
				/>
			</div>
			<div className={cl.info}>
				<div className={cl.infoTitle}>Поможем сделать правильный выбор</div>
				<div className={cl.infoDesc}>
					Оставьте заявку и наши менеджеры подберут для вашего автомобиля
					требуемый товар
				</div>

				<div className={cl.infoBtn}>
					<ButtonDefault onClick={() => setOpen(true)} outline>
						Оставить заявку
					</ButtonDefault>
				</div>
			</div>
			<ModalCallback open={open} onToggleOpen={(value) => setOpen(value)} />
		</div>
	);
};
