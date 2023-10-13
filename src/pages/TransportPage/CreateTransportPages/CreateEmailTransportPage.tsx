import React, {useState} from 'react';
import {useTransportStore} from "store/transportStore/useTransportStore";
import {useUserStore} from "store/userStore/useUserStore";
import EmailTransport from "models/Transport/IEmailTransport";
import {ITransport} from "models/Transport/ITransport";
import styles from "../TransportPage.module.scss";
import AppInput from "components/Input/AppInput";
import {useNavigate} from "react-router-dom";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";
import {successful, unsuccessful} from "../../../components/UI/Toast/Toast";
import AppButton from "../../../components/UI/AppButton/AppButton";

const CreateEmailTransportPage = () => {

    const [transportName, setTransportName] = useState('');
    const [emailUsername, setEmailUsername] = useState('');
    const [emailFrom, setEmailFrom] = useState('');
    const [emailPort, setEmailPort] = useState(0);
    const [emailServer, setEmailServer] = useState('');
    const [emailFromName, setEmailFromName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const sendTransport = useTransportStore(state => state.sendTransport);
    const addTransport = useTransportStore(state => state.addTransport);
    const userId = useUserStore(state => state.user?.id) || '';
    const projectId = useProjectStore(state => state.currentProject?.id) || '';

    //middlewares
    const changeTransportNameMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setTransportName(e.currentTarget.value);
    }

    const changeEmailUsernameMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setEmailUsername(e.currentTarget.value);
    } // нужен ли?

    const changeEmailFromMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setEmailFrom(e.currentTarget.value);
    }

    const changeEmailPortMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setEmailPort(Number(e.currentTarget.value));
    }

    const changeEmailServerMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setEmailServer(e.currentTarget.value);
    }

    const changeEmailFromNameMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setEmailFromName(e.currentTarget.value);
    }

    const changePasswordMiddleware = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEmailTransport: EmailTransport = new EmailTransport(
            projectId,
            transportName,
            userId,
            emailUsername,
            emailFrom,
            emailPort,
            emailServer,
            emailFromName,
            password
        );
        try {
            sendTransport(newEmailTransport).then((response: ITransport) => addTransport(response)).then(() => successful('Транспорт успешно создан'));
        } catch (e) {
            unsuccessful((e as Error).message)
        } finally {
            navigate('/transfers')
        }
    }


    return (
        <div>
            <form onSubmit={formSubmit} className={styles.transfer__create}>
                <AppInput
                    id={'transportName'}
                    label={'Название транспорта:'}
                    type={'text'}
                    name={'transportName'}
                    placeholder={'Придумайте название транспорта'}
                    onChange={changeTransportNameMiddleware}
                    maxLength={40}

                />

                <div className={styles.transfer__flexWrapper}>
                    <div className={styles.transfer__flexWrapperItem}>
                        <AppInput
                            id={'senderName'}
                            label={'Имя отправителя'}
                            type={'text'}
                            name={'transportName'}
                            placeholder={'От кого будет письмо'}
                            onChange={changeEmailUsernameMiddleware}
                            maxLength={40}

                        />

                        <AppInput
                            id={'senderEmail'}
                            label={'E-mail отправителя'}
                            type={'text'}
                            name={'transportName'}
                            placeholder={'Адрес с которого придёт письмо'}
                            onChange={changeEmailFromMiddleware}
                            maxLength={40}

                        />

                        <AppInput
                            id={'name'}
                            label={'Отображаемое имя:'}
                            type={'text'}
                            name={'transportName'}
                            placeholder={'Введите отображаемое имя'}
                            onChange={changeEmailFromNameMiddleware}
                            maxLength={40}
                        />

                    </div>
                    <div className={styles.transfer__flexWrapperItem}>
                        <AppInput
                            id={'server'}
                            label={'Сервер'}
                            type={'text'}
                            name={'transportEmailServer'}
                            placeholder={'Адрес почтового сервера'}
                            onChange={changeEmailServerMiddleware}
                            maxLength={40}


                        />

                        <AppInput
                            id={'port'}
                            label={'Порт'}
                            type={'number'}
                            name={'transportName'}
                            placeholder={'Порт почтового сервера'}
                            onChange={changeEmailPortMiddleware}
                            defaultValue={'0'}
                            maxLength={4}
                            />

                        <AppInput
                            id={'password'}
                            label={'Пароль'}
                            type={'password'}
                            name={'transportName'}
                            placeholder={'Пароль для email'}
                            onChange={changePasswordMiddleware}
                        />

                    </div>
                </div>
                <div className={styles.transfer__create_btn}>
                    <AppButton type={'submit'} value={'Создать'}/>
                </div>

            </form>
        </div>
    );
};

export default CreateEmailTransportPage;