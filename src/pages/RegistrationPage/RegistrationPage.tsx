import React from 'react';
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.scss"
import logo from 'assets/svg/logo_grey.svg'
import TranslucentWrapper from "../../components/UI/TranslucentWrapper/TranslucentWrapper";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.registrationPage}>
            <TranslucentWrapper>
            <img className={styles.registrationPage__image} src={logo} alt="лого" onClick={() => navigate("/")}/>
            <RegistrationForm/>
            </TranslucentWrapper>
        </div>
    );
};

export default RegistrationPage;