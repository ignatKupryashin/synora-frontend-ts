import React, {useState} from 'react';
import AppInput from "../Input/AppInput";
import AppButton from "../UI/AppButton/AppButton";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore/useUserStore";
import styles from './LoginForm.module.scss'

const LoginForm = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useUserStore(state => state.login);

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(userName, password);
        navigate('/');
    }

    return (
            <form className={styles.loginForm}  onSubmit={formSubmit}>
                <AppInput
                    id="userName"
                    type="text"
                    name="userName"
                    placeholder="Логин"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={styles.loginForm__input}
                ></AppInput>
                <AppInput
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.loginForm__input}
                    ></AppInput>
                <div className={styles.loginForm__buttonBlock}>
                <AppButton type="submit" value="Логин"></AppButton>
                <AppButton type={"button"} value={"Регистрация"} onClick={() => navigate('/registration')} className={styles.loginForm__registrationButton}/>
                </div>
            </form>
    );
};

export default LoginForm;