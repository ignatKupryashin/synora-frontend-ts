import React, {FC} from 'react';
import styles from "./Sidebar.module.scss"
import {Link} from "react-router-dom";
import NavElement from "../NavElement/NavElement";
import logo from 'assets/svg/App_logo.svg'

const Sidebar:FC = () => {

	return (
		<div className={styles.sidebar}>
			<header className={styles.sidebar__logo}>
				<Link to='/'>
					<img src={logo} alt="logo" />
				</Link>
			</header>
			<div className={styles.sidebar__user}>User ID</div>
			<ul className={styles.sidebar__navbar}>
				<NavElement to='/'>Главная</NavElement>
				<NavElement to='/events'>События</NavElement>
				<NavElement to='/templates'>Шаблоны</NavElement>
				<NavElement to='/transfers'>Транспорты</NavElement>
			</ul>
			<footer className={styles.sidebar__footer}>
				<Link to='#' className={styles.sidebar__footer_text}>Помощь</Link>
			</footer>
		</div>
	);
};

export default Sidebar;