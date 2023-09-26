import React, {useState} from 'react';
import AppInput from "../Input/AppInput";
import AppButton from "../UI/AppButton/AppButton";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore/useUserStore";

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
            <form onSubmit={formSubmit}>
                <AppInput
                    id="userName"
                    type="text"
                    name="userName"
                    label="Введите логин"
                    placeholder="Логин"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}></AppInput>
                <AppInput
                    id="password"
                    type="password"
                    name="password"
                    label="Введите логин"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></AppInput>
                <AppButton type="submit" value="Логин"></AppButton>
            </form>
    );
};

export default LoginForm;