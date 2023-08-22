import React from 'react';
import styles from "./Header.module.scss";

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Проект: Проект_1_с длинным_названием</p>
				<p className={styles.header__item__text}>fc2ed34e-2581-44e8-9fa1-948500f2bb90</p>
			</div>
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Пользователь (User ID):</p>
				<p className={styles.header__item__text}>fc2ed34e-2581-44e8-9fa1-948500f2bb90</p>
			</div>
		</div>
	)
};

export default Header;