import styles from './footer.module.scss';
import { Container } from '../container/container.component';
import { ListItems } from '../list-items/list-items.component';
import { menuMock } from '../menu/menu.mock';
import { phones } from '../../const/setting';
import { ButtonDefault } from '../buttons/default/default.component';
import { ModalCallback } from '../modals/modal-callback/modal-callback.component';
import { useState } from 'react';
import { RoutsPath } from '../../../@types';

export const Footer = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<section className={styles.footer}>
			<Container>
				<div className={styles.footerMenuRow}>
					<div
						className={styles.footerMenu + ' ' + styles.footerMenuHideMobile}
					>
						<ListItems
							title="Товары"
							items={
								menuMock[0]?.subMenu?.map((item) => ({
									name: item.name,
									href: RoutsPath.products + item.href,
								})) || []
							}
						/>
					</div>
					<div className={styles.footerMenu + ' ' + styles.footerMenuHide}>
						<ListItems
							title="Услуги"
							items={
								menuMock[1]?.subMenu?.map((item) => ({
									name: item.name,
									href: RoutsPath.services.toString() + item.href,
								})) || []
							}
						/>
					</div>

					<div className={styles.footerInfo}>
						<a className={styles.footerPhone} href={`tel: ${phones[0].href}`}>
							{phones[0].label}
							<span className={styles.footerPhoneTitle}>Звонок бесплатный</span>
						</a>
						<div className={styles.footerCallback}>
							<ButtonDefault
								className={styles.footerCallbackBtn}
								outline
								onClick={() => setOpen(true)}
							>
								Заказать обратный звонок
							</ButtonDefault>
						</div>
						<div className={styles.footerSocialsTitle}>
							Мы в социальных сетях
						</div>
						<div className={styles.footerSocials}>
							<a href="#" className={styles.footerSocialsLink} target="_blank">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M15.8574 11.1427C15.8144 11.0707 15.5484 10.4926 14.2683 9.30455C12.9282 8.06046 13.1082 8.26248 14.7223 6.11132C15.7054 4.80122 16.0984 4.00116 15.9754 3.65913C15.8584 3.33311 15.1354 3.41912 15.1354 3.41912L12.7312 3.43312C12.7312 3.43312 12.5532 3.40912 12.4202 3.48812C12.2911 3.56613 12.2081 3.74614 12.2081 3.74614C12.2081 3.74614 11.8271 4.76022 11.3191 5.62228C10.248 7.44141 9.81896 7.53742 9.64395 7.42441C9.23692 7.16139 9.33892 6.36633 9.33892 5.80229C9.33892 4.03916 9.60594 3.30411 8.81789 3.11409C8.55587 3.05109 8.36385 3.00909 7.6948 3.00208C6.83674 2.99308 6.10968 3.00509 5.69865 3.2061C5.42463 3.34011 5.21361 3.63913 5.34262 3.65613C5.50164 3.67714 5.86166 3.75314 6.05268 4.01316C6.2997 4.34819 6.2907 5.10224 6.2907 5.10224C6.2907 5.10224 6.43271 7.17739 5.95967 7.43541C5.63465 7.61243 5.18961 7.2514 4.23454 5.60028C3.7455 4.75522 3.37548 3.82015 3.37548 3.82015C3.37548 3.82015 3.30447 3.64613 3.17746 3.55313C3.02345 3.44012 2.80743 3.40411 2.80743 3.40411L0.521262 3.41812C0.521262 3.41812 0.178237 3.42812 0.0522272 3.57713C-0.0597812 3.71014 0.0432265 3.98416 0.0432265 3.98416C0.0432265 3.98416 1.83336 8.17147 3.85951 10.2826C5.71865 12.2178 7.82881 12.0908 7.82881 12.0908H8.78488C8.78488 12.0908 9.0739 12.0588 9.22092 11.8997C9.35693 11.7537 9.35193 11.4797 9.35193 11.4797C9.35193 11.4797 9.33292 10.1966 9.92897 10.0076C10.516 9.82159 11.2701 11.2477 12.0691 11.7967C12.6732 12.2118 13.1322 12.1208 13.1322 12.1208L15.2694 12.0908C15.2694 12.0908 16.3875 12.0218 15.8574 11.1427Z"
										fill="#FF7E00"
									/>
								</svg>
							</a>

							<a href="#" className={styles.footerSocialsLink} target="_blank">
								<svg
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M11.9602 2.03455C10.6442 0.723242 8.8939 0.000769042 7.02928 0C3.18704 0 0.0600162 3.11197 0.0584707 6.93685C0.0579556 8.15955 0.378901 9.3531 0.988936 10.4052L0 14L3.69533 13.0353C4.71355 13.588 5.85986 13.8793 7.02645 13.8797H7.02936C10.8712 13.8797 13.9985 10.7675 14 6.94241C14.0008 5.08867 13.2764 3.34576 11.9602 2.03455ZM7.02928 12.7081H7.02687C5.98728 12.7077 4.96769 12.4296 4.07801 11.9044L3.86654 11.7793L1.67367 12.3519L2.25898 10.2241L2.12117 10.0059C1.54119 9.08787 1.23493 8.02676 1.23544 6.93728C1.23664 3.75814 3.8358 1.17168 7.0316 1.17168C8.57914 1.17219 10.0339 1.77273 11.1277 2.86263C12.2216 3.95254 12.8236 5.40125 12.8231 6.94198C12.8217 10.1214 10.2228 12.7081 7.02928 12.7081ZM10.2073 8.38958C10.0332 8.30276 9.17681 7.88354 9.01711 7.82561C8.85758 7.76776 8.74133 7.73896 8.62533 7.91243C8.50916 8.08589 8.17542 8.47639 8.07377 8.592C7.97211 8.7077 7.87062 8.72223 7.69641 8.63541C7.5222 8.54868 6.96102 8.36556 6.29569 7.77502C5.77795 7.31539 5.42842 6.74775 5.32676 6.57429C5.22527 6.40066 5.3259 6.31589 5.40317 6.22053C5.59172 5.98751 5.78053 5.74321 5.83857 5.6276C5.8967 5.5119 5.86759 5.41064 5.82397 5.32391C5.78053 5.23718 5.4322 4.38397 5.28709 4.03679C5.14559 3.69893 5.00212 3.74456 4.89514 3.73926C4.79365 3.73422 4.67749 3.73319 4.56132 3.73319C4.44523 3.73319 4.25651 3.77651 4.09681 3.95015C3.9372 4.12369 3.48729 4.54299 3.48729 5.3962C3.48729 6.24941 4.11141 7.07366 4.19847 7.18936C4.28553 7.30505 5.4267 9.05591 7.17387 9.80666C7.58943 9.98542 7.91381 10.092 8.16684 10.1719C8.58412 10.3038 8.96371 10.2852 9.26387 10.2406C9.59856 10.1908 10.2943 9.82119 10.4396 9.41633C10.5847 9.01139 10.5847 8.66438 10.541 8.592C10.4976 8.51971 10.3814 8.47639 10.2073 8.38958Z"
										fill="#FF7E00"
									/>
								</svg>
							</a>
						</div>
					</div>

					<div className={styles.footerMenu + ' ' + styles.footerMenuHide}>
						<ListItems
							title="Компания"
							items={
								menuMock[2]?.subMenu?.map((item) => ({
									name: item.name,
									href: item.href,
								})) || []
							}
						/>
					</div>

					<div
						className={styles.footerMenu + ' ' + styles.footerMenuHideMobile}
					>
						<ListItems
							title="Личный кабинет"
							items={[
								{
									name: 'Войдите в профиль',
									href: '',
								},
							]}
						/>
					</div>
				</div>
			</Container>
			<ModalCallback open={open} onToggleOpen={(value) => setOpen(value)} />
		</section>
	);
};
