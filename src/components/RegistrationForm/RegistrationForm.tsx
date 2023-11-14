import React, {useEffect, useState} from 'react';
import AppInput from "../Input/AppInput";
import RegistrationService from "../../services/RegistrationService";
import {successful, unsuccessful} from "../UI/Toast/Toast";
import {useNavigate} from "react-router-dom";
import styles from "./RegistrationForm.module.scss";

const RegistrationForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setNameIsValid(nameExpression.test(name) || name.length === 0);
    }, [name]);

    useEffect(() => {
        setSurnameIsValid(nameExpression.test(surname) || surname.length === 0);
    }, [surname]);

    useEffect(() => {
        setEmailIsValid(emailExpression.test(email));
    }, [email]);


    const nameOnBlur = () => {
        !nameIsValid && unsuccessful("Имя должно содержать только русские или английские буквы");
    }

    const surnameOnBlur = () => {
        !surnameIsValid && unsuccessful("Фамилия должна содержать только русские или английские буквы");
    }

    const emailOnBlur = () => {
        !emailIsValid && unsuccessful("Неправильный формат почты");
    }






    const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameExpression: RegExp = /^([а-яё]+|[a-z]+)$/i;

    const [nameIsValid, setNameIsValid] = useState(true);
    const [surnameIsValid, setSurnameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);

    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        (!!username&&
        !!password&&
        emailIsValid &&
        nameIsValid &&
        surnameIsValid) ? setButtonEnabled(true) : setButtonEnabled(false);
    }, [username, password, nameIsValid, surnameIsValid, emailIsValid]);


    const navigate = useNavigate();

    const validateAndRegister = async () => {

        nameOnBlur();
        surnameOnBlur();
        emailOnBlur();

        if (username &&
            email &&
            password &&
            nameIsValid &&
            surnameIsValid &&
            emailIsValid) {
            try {
                await RegistrationService.registration(username, email, password, name, surname);
                successful("Вы успешно зарегистрировались");
                navigate('/');
            } catch (e) {
                unsuccessful((e as Error).message);
            }
        } else {
            unsuccessful("Необходимо заполнить все обязательные поля")
        }

    }


    return (
        <div className={styles.registrationForm}>
            <div className={styles.registrationForm__inputWrapper}>
                <div className={styles.registrationForm__group}>
                <AppInput className={styles.registrationForm__input} label="Логин*" id={'userName'} type={"text"} name={"userName"} onChange={(e) => setUsername(e.target.value)}
                          labelClassName={styles.registrationForm__label} value={username}   placeholder={"Введите ваш логин"}/>
                <AppInput className={styles.registrationForm__input} label="Почта*" id={'email'} type={"email"} name={"email"} onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => emailOnBlur()} labelClassName={styles.registrationForm__label} value={email}  placeholder={"Введите вашу почту"}/>
                <AppInput className={styles.registrationForm__input} label="Пароль*" id={'password'} type={"password"} name={"password"}
                          labelClassName={styles.registrationForm__label}  onChange={(e) => setPassword(e.target.value)} placeholder={"Введите ваш пароль"}/>
                <AppInput className={styles.registrationForm__input} label={"Имя"} value={name} id={'name'} type={"text"} name={"name"} onChange={(e) => setName(e.target.value)}
                        onBlur={() => nameOnBlur()} labelClassName={styles.registrationForm__label} placeholder={"Введите ваше имя"}/>
                <AppInput className={styles.registrationForm__input} label={"Фамилия"} value={surname} id={'surname'} type={"text"} name={"surname"} onChange={(e) => setSurname(e.target.value)}
                          onBlur={() => surnameOnBlur()} labelClassName={styles.registrationForm__label} placeholder={"Введите вашу фамилию"}/>
                </div>
            </div>
            <button className={styles.registrationForm__registrationButton} type={"button"} disabled={!buttonEnabled} onClick={() => validateAndRegister()}>Зарегистрироваться</button>
            <p className={styles.registrationForm__registeredQuestion}>Уже зарегистрированы?</p>
            <button className={styles.registrationForm__loginButton} onClick={() => navigate("/")}>Войти</button>
            <p className={styles.registrationForm__comment}>**Поля со знаком * являются обязательными.</p>
        </div>
    );
};

export default RegistrationForm;