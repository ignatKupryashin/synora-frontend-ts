import React, {useEffect, useState} from 'react';
import AppInput from "../Input/AppInput";
import AppButton from "../UI/AppButton/AppButton";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "@/store/userStore/useUserStore.ts";
import styles from './LoginForm.module.scss'

const LoginForm = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useUserStore(state => state.login);

    const [filled, setFilled] = useState(false);

    useEffect(() => {
        setFilled(!!(userName && password));
    }, [userName, password]);

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(userName, password);
        navigate('/');
    }

    return (
            <form className={styles.loginForm}  onSubmit={formSubmit}>
                <div className={styles.loginForm__inputBlock}>
                <AppInput
                    id="userName"
                    type="text"
                    name="userName"
                    placeholder="Введите ваш логин"
                    value={userName}
                    label={"Логин"}
                    labelClassName={styles.loginForm__label}
                    onChange={(e) => setUserName(e.target.value)}
                    className={styles.loginForm__input}
                ></AppInput>
                <AppInput
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Введите ваш пароль"
                    label={"Пароль"}
                    value={password}
                    labelClassName={styles.loginForm__label}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.loginForm__input}
                    ></AppInput>
                </div>
                <button className={styles.loginForm__loginButton} disabled={!filled} type="submit">Логин</button>
                <AppButton type={"button"} value={"Регистрация"} onClick={() => navigate('/registration')} className={styles.loginForm__registrationButton}/>
            </form>
    );
};

export default LoginForm;