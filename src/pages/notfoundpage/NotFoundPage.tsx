import React from 'react';

import styles from './NotFoundPage.module.scss'
import {Link} from "react-router-dom";
const NotFoundPage = () => {
	return (
		<div className={styles.notfoundage}>
			<p className={styles.notfoundage__text}>Ошибка 404. Страница не существует.</p>
			<p className={styles.notfoundage__text}>Перейти на <Link to="/" className={styles.notfoundage__text_link}>Главная</Link></p>
		</div>
	)
};

export default NotFoundPage;