import React from 'react';
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.scss"
import logo from "../../assets/svg/App_logo.svg";

const RegistrationPage = () => {
    return (
        <div className={styles.registrationPage}>
            <img className={styles.registrationPage__image} src={logo} alt="лого"/>
            <RegistrationForm/>
        </div>
    );
};

export default RegistrationPage;