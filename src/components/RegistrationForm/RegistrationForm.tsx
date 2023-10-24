import React, {useState} from 'react';
import AppInput from "../Input/AppInput";
import AppButton from "../UI/AppButton/AppButton";
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

    const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameExpression: RegExp = /^([а-яё]+|[a-z]+)$/i;

    const [nameIsValid, setNameIsValid] = useState(true);
    const [surnameIsValid, setSurnameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);

    const navigate = useNavigate();

    const validateAndRegister = async () => {
        console.log(name);
        nameExpression.test(name) ? setNameIsValid(true) : setNameIsValid(false);
        nameExpression.test(surname) ? setSurnameIsValid(true) : setSurnameIsValid(false);
        emailExpression.test(email) ? setEmailIsValid(true) : setEmailIsValid(false);
        !name && setNameIsValid(true);
        !surname && setSurnameIsValid(true);
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
                <AppInput label=" " id={'userName'} type={"text"} name={"userName"} onChange={(e) => setUsername(e.target.value)}
                          labelClassName={styles.registrationForm__errorLabel} value={username}   placeholder={"Логин"}/>
                <AppInput label={emailIsValid ? " " : "Неправильный формат почты"} id={'email'} type={"email"} name={"email"} onChange={(e) => setEmail(e.target.value)}
                          labelClassName={styles.registrationForm__errorLabel} value={email}  placeholder={"Почта"}/>
                <AppInput label=" " id={'password'} type={"password"} name={"password"}
                          labelClassName={styles.registrationForm__errorLabel}  onChange={(e) => setPassword(e.target.value)} placeholder={"Пароль"}/>
                <AppInput label={nameIsValid ? " " : "Имя должно содержать только русские или английские буквы"} value={name} id={'name'} type={"text"} name={"name"} onChange={(e) => setName(e.target.value)}
                         labelClassName={styles.registrationForm__errorLabel} placeholder={"Ваше имя (не обязательно)"}/>
                <AppInput label={surnameIsValid ? " " : "Фамилия должна содержать только русские или английские буквы"} value={surname} id={'surname'} type={"text"} name={"surname"} onChange={(e) => setSurname(e.target.value)}
                          labelClassName={styles.registrationForm__errorLabel} placeholder={"Ваша фамилия (не обязательно)"}/>
                </div>
            </div>
                <AppButton type={"button"} value={"Зарегистрироваться"} onClick={() => validateAndRegister()}/>
        </div>
    );
};

export default RegistrationForm;