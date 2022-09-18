import { IOrderItemLocation } from '../../../@types';
import { ButtonDefault } from '../../../client/components/buttons/default/default.component';
import { Radio } from '../../../client/components/inputs/radio/radio.component';
import { SlideDownCustom } from '../../../client/components/slide-down/slide-down.component';
import { TextItemLabel } from '../../../client/components/text-item/text-item.component';
import cl from '../order.module.scss';

interface IItemOrderLocation {
	disabled: boolean;
	defaultClose?: boolean;
	onChangeRadio: (value: string, id: string, name?: string) => void;
	step?: number;
	radioList: IOrderItemLocation[];
	radio: string;
	changeStepValue: (value: boolean) => void;
	isValid: boolean;
}

export const ItemOrderLocation = ({
	defaultClose,
	disabled,
	onChangeRadio,
	step = 2,
	radio,
	radioList,
	changeStepValue,
	isValid,
}: IItemOrderLocation) => {
	return (
		<SlideDownCustom
			title="Способ получения"
			step={step}
			disabled={disabled}
			defaultClose={defaultClose}
			isValid={isValid}
		>
			<>
				{radioList.map((item) => (
					<div className={cl.formItem} key={item.id}>
						<Radio
							value={item.value}
							checked={radio === item.value}
							label={
								<TextItemLabel
									title={item.label.title}
									value={item.label.subTitle}
								/>
							}
							onChange={onChangeRadio}
							id={item.id}
							name={item.name}
						/>
					</div>
				))}
				<ButtonDefault
					className={cl.formButton}
					onClick={() => changeStepValue(true)}
				>
					Перейти к способу оплаты
				</ButtonDefault>
			</>
		</SlideDownCustom>
	);
};
