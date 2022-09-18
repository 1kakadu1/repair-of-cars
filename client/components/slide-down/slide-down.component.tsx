import React, {
	MutableRefObject,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { SlideDown } from 'react-slidedown';
import { IconArrowSmallRight } from '../icons/arrow-small-right.icon.component';

export const SlideDownCustom = ({
	children,
	title,
	classNameTitle = '',
	className = '',
	defaultClose = true,
	step,
	isValid,
	disabled,
	ref,
}: {
	children: JSX.Element;
	title: string;
	classNameTitle?: string;
	className?: string;
	defaultClose?: boolean;
	step?: number;
	isValid?: boolean;
	disabled?: boolean;
	ref?: MutableRefObject<HTMLDivElement | null>;
}) => {
	const intiOpen =
		disabled !== undefined
			? disabled === true
				? true
				: defaultClose
			: defaultClose;
	const [open, setOpen] = useState(intiOpen);

	const onOpen = useCallback(() => {
		if (disabled === undefined || !disabled) {
			setOpen(!open);
		}
	}, [disabled, open]);

	useEffect(() => {
		setOpen(defaultClose);
	}, [defaultClose]);

	return (
		<div className={'slide-dropdown ' + className}>
			<div
				className={'slide-dropdown__button ' + classNameTitle}
				onClick={onOpen}
				ref={ref}
			>
				<span className={`slide-dropdown__wrap-title`}>
					{step && (
						<div
							className={`slide-dropdown__step ${
								isValid !== undefined && isValid ? 'slide-dropdown__valid' : ''
							} ${disabled ? 'disabled' : ''}`}
						>
							{(isValid === undefined || isValid === false) && step}
							{isValid && (
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M13 5.37853L6.73588 11.7145C6.35953 12.0952 5.74934 12.0952 5.37299 11.7145L2 8.30282L3.36289 6.92429L6.05443 9.64671L11.6371 4L13 5.37853Z"
										fill="#12BB9D"
									/>
								</svg>
							)}
						</div>
					)}
					<span className={classNameTitle + ' ' + 'slide-dropdown__title'}>
						{title}
					</span>
				</span>

				<IconArrowSmallRight
					className={`slide-dropdown__icon ${
						step ? 'slide-dropdown__icon_color' : ''
					} ${open ? 'open' : ''}`}
				/>
			</div>
			<SlideDown
				className={`pure-menu pure-menu-scrollable slide-dropdown__list ${
					step ? 'slide-dropdown__list_step' : ''
				} ${isValid !== undefined && isValid ? 'slide-dropdown__valid' : ''}`}
				closed={open}
			>
				{children}
			</SlideDown>
		</div>
	);
};
