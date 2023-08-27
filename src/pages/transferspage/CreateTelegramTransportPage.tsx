import React, {useState} from 'react';
import styles from "./TransferPage.module.scss";
import AppInput from "../../components/Input/AppInput";
import {useTransportStore} from "../../store/transportStore/useTransportStore";
import TelegramTransport from "../../models/TelegramTransport";
import {useUserStore} from "../../store/userStore/useUserStore";
import {ITransport} from "../../models/ITransport";

const CreateTelegramTransportPage = () => {

    const [transportName, setTransportName] = useState('');
    const [telegramToken, setTelegramToken] = useState('');
    const sendTransport = useTransportStore(state => state.sendTransport);
    const addTransport = useTransportStore(state => state.addTransport);
    const userId = useUserStore(state => state.userId);
    const projectId = useUserStore(state => state.projectId);

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTelegramTransport = new TelegramTransport(
            projectId, transportName, userId, telegramToken
        );
        try {
            sendTransport(newTelegramTransport).then((response) => addTransport(response))
        }
        catch (error) {
            console.log((error as Error).message)
        }
        finally {
            e.currentTarget.reset();
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
                    <button type="submit" className={styles.transfer__create_btn_link}>Создать</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTelegramTransportPage;