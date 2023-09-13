import React from 'react';
import styles from "./Header.module.scss";
import {useUserStore} from "../../store/userStore/useUserStore";
import {useProjectStore} from "../../store/projectStore/useProjectStore";

const Header = () => {
	const userName: string | undefined = useUserStore(state => state.user?.name);
	const projectName: string | undefined  = useProjectStore((state) => state.currentProject?.name);

	return (
		<div className={styles.header}>
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Проект: Проект_1_с длинным_названием</p>
				<p className={styles.header__item__text}>{projectName ? projectName : 'нет проекта'}</p>
			</div>
			<div className={styles.header__item}>
				<p className={styles.header__item__title}>Пользователь (User ID):</p>
				<p className={styles.header__item__text}>{userName ? userName : 'нет юзера'}</p>
			</div>
		</div>
	)
};

export default Header;