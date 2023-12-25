import React, {FC} from 'react';
import styles from "./Sidebar.module.scss"
import {Link, useNavigate} from "react-router-dom";
import NavElement from "../NavElement/NavElement";
import logo from 'assets/svg/App_logo.svg'
import {useUserStore} from "../../store/userStore/useUserStore";


const Sidebar: FC = () => {
    const userName = useUserStore(state => state.user?.name);
    const logout = useUserStore(state => state.logout);
    const navigate = useNavigate();
    const logoutHandler = () => {
        logout();
        navigate('/');
    }

    return (
        <div className={styles.sidebar}>
            <header className={styles.sidebar__logo}>
                <Link to='/'>
                    <img src={logo} className={styles.sidebar__logoImg} alt="logo"/>
                </Link>
            </header>
            {/*<div className={styles.sidebar__user}>{userName}</div>*/}
            <ul className={styles.sidebar__navbar}>
                {/*<NavElement to='/'>Главная</NavElement>*/}
                <NavElement to='/'>Рассылки</NavElement>
                <NavElement to='/templates'>Шаблоны</NavElement>
                <NavElement to='/transfers'>Транспорты</NavElement>
            </ul>
            <footer className={styles.sidebar__footer}>
                <div onClick={() => logoutHandler()} className={styles.sidebar__footer_text}>Выход</div>
            </footer>
        </div>
    );
};

export default Sidebar;