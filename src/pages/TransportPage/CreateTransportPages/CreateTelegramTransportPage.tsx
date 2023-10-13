import React, {useState} from 'react';
import styles from "../TransportPage.module.scss";
import AppInput from "components/Input/AppInput";
import {useTransportStore} from "store/transportStore/useTransportStore";
import TelegramTransport from "models/Transport/TelegramTransport";
import {useUserStore} from "store/userStore/useUserStore";
import {useNavigate} from "react-router-dom";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";
import {successful, unsuccessful} from "../../../components/UI/Toast/Toast";
import AppButton from "../../../components/UI/AppButton/AppButton";

const CreateTelegramTransportPage = () => {

    const [transportName, setTransportName] = useState('');
    const [telegramToken, setTelegramToken] = useState('');
    const sendTransport = useTransportStore(state => state.sendTransport);
    const addTransport = useTransportStore(state => state.addTransport);
    const userId = useUserStore(state => state.user?.id) || '';
    const projectId = useProjectStore(state => state.currentProject?.id) || '';
    const navigate = useNavigate();

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTelegramTransport = new TelegramTransport(
            projectId, transportName, userId, telegramToken
        );
        try {
            sendTransport(newTelegramTransport).then((response) => addTransport(response)).then(() => successful('Транспорт успешно создан'))
        }
        catch (error) {
            unsuccessful((error as Error).message)
        }
        finally {
            navigate('/transfers')
        }
    }

// : { preventDefault: () => void;}

    //middleware
    const changeTransportName = (e: React.FormEvent<HTMLInputElement>) => {
        setTransportName(e.currentTarget.value);
    }

    const changeTelegramToken = (e: React.FormEvent<HTMLInputElement>) => {
        setTelegramToken(e.currentTarget.value);
    }


    return (
        <div>
            <form onSubmit={formSubmit} className={styles.transfer__create}>
                <AppInput
                    id={'transportName'}
                    label={'Наименование транспорта:'}
                    type={'text'}
                    name={'transportName'}
                    placeholder={'Введите наименование транспорта'}
                    onChange={changeTransportName}
                    maxLength={40}

                />
                <AppInput
                    id={'telegramToken'}
                    label={'Телеграм токен:'}
                    type={'text'}
                    name={'telegramToken'}
                    placeholder={'Введите телеграм токен'}
                    onChange={changeTelegramToken}
                />
                <div className={styles.transfer__create_btn}>
                    <AppButton type={'submit'} value={'Создать'}/>
                </div>
            </form>
        </div>
    );
};

export default CreateTelegramTransportPage;