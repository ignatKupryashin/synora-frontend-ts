import React, {useState} from 'react';
import AppInput from "../../components/Input/AppInput";
import AppButton from "../../components/UI/AppButton/AppButton";
import {useFetching} from "../../hooks/useFetching";
import {useUserStore} from "../../store/userStore/useUserStore";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const getUser = useUserStore (state => state.getUser);
    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const [profile,
        profileIsLoading] = useFetching(
        () => getUser(email));

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await profile().then((response) => {
            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    if (response.data.length > 0) {
                        setUser(response.data[0]);
                        successful('Вы вошли в систему');
                        navigate('/')
                    }
                    else  {
                        unsuccessful('Пользователь с таким email не найден');
                    }
                }
                else {
                    unsuccessful(`Ошибка: ${response.data.detail}`);
                }
            }
        })
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <AppInput
                    id="email"
                    type="text"
                    name="email"
                    label="Введите email"
                    width={"300px"}
                    onChange={(e) => setEmail(e.target.value)}></AppInput>
                <AppButton type="submit" value="Логин"></AppButton>
            </form>
        </div>
    );
};

export default LoginPage;