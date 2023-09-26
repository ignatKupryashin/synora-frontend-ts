import React from 'react';
import styles from "./LoginPage.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import logo from 'assets/svg/App_logo.svg'

const LoginPage = () => {
    return (
        <div className={styles.loginPage}>
            <img className={styles.loginPage__image} src={logo} alt="лого"/>
           <LoginForm/>
        </div>
    );
};

export default LoginPage;