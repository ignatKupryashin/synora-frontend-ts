import React from 'react';
import styles from "./Header.module.scss";
import {useUserStore} from "../../store/userStore/useUserStore";

const Header = () => {
	const userId: string = useUserStore((state) => state.userId);
	const projectId: string = useUserStore((state) => state.projectId);

	return (
		<div className={styles.header}>
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Проект: Проект_1_с длинным_названием</p>
				<p className={styles.header__item__text}>{projectId}</p>
			</div>
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Пользователь (User ID):</p>
				<p className={styles.header__item__text}>{userId}</p>
			</div>
		</div>
	)
};

export default Header;