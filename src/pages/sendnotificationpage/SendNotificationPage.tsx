import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useUserStore} from "../../store/userStore/useUserStore";
import {useProjectStore} from "../../store/projectStore/useProjectStore";
import AppTextArea from "../../components/UI/AppTextArea/AppTextArea";
import AppButton from "../../components/UI/AppButton/AppButton";
import {SynoraNotification} from "../../models/Notification/SynoraNotification";
import {useSynoraEventStore} from "../../store/eventStore/useSynoraEventStore";
import {successful, unsuccessful} from "../../components/UI/Toast/Toast";
import {$notificationApi} from "../../http";
import styles from "./SendNotificationPage.module.scss"

const SendNotificationPage: FC = () => {
    const {currentEventId} = useParams<string>();
    const userId = useUserStore.getState().userId();
    const projectId = useProjectStore.getState().currentProject?.id;
    const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const currentEvent = useSynoraEventStore.getState().events.filter((item) => item.id == currentEventId)[0];


    const [emailInput, setEmailInput] = useState('');
    const [telegramInput, setTelegramInput] = useState('');

    const [emailOutput, setEmailOutput] = useState<string[]>([]);
    const [telegramOutput, setTelegramOutput] = useState<string[]>([]);

    //написать дебаунс
    useEffect(() => {
        const data = emailInput
            .replace(/\s/g, "")
            .split(',')
            .filter((item) => emailExpression.test(item))
        setEmailOutput(data)
    }, [emailInput]);

    //написать дебаунс
    useEffect(() => {

        const data = telegramInput.split(',')
            .filter((item) => (+item))
            .filter((item) => (Math.floor(Number(item)) === Number(item)));
        setTelegramOutput([...data])
        // data.forEach((item) => {
        //     +item && setTelegramOutput([...telegramOutput, item]);
        // })
    }, [telegramInput]);

    const sendNotification = async () => {
        try {
        {
            if (projectId) {
            const notification = new SynoraNotification(currentEvent.event_code, projectId, userId);
            if (telegramOutput.length > 0) {
                telegramOutput.forEach((item) => notification.message_recipients.push({
                    telegram_chat_id: Number(item)
                }))
            }
            if (emailOutput.length > 0) {
                emailOutput.forEach((item) => notification.message_recipients.push({
                    email: item
                }))
            }
            const response = await $notificationApi.post('/notification', notification);
            if (response.status >= 200 && response.status < 300) {
                successful('Рассылка успешно отправлена')
            }
            else {
                unsuccessful(response.statusText)
            }
            }
            else {
                unsuccessful('Ошибка отсутствия ID проекта')
            }
        }}
        catch (e) {
            unsuccessful((e as Error).message)
        }
    }

    return (
        <div>
            <h1 className={styles.sendNotificationPage__heading}>Отправка рассылки</h1>
            <div className={styles.sendNotificationPage__protocolWrapper}>
                <div>
                    <h2 className={styles.sendNotificationPage__protocolHeading}>Введите список email</h2>
                    <AppTextArea
                        className={styles.sendNotificationPage__textarea}
                        id={'email'}
                        name={'email'}
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <h2 className={styles.sendNotificationPage__protocolHeading}>Обнаруженные email</h2>
                    <div className={styles.sendNotificationPage__outputData}>
                   {
                       emailOutput.length > 0 ?

                            <ol className={styles.sendNotificationPage__list}>
                                {emailOutput.map((item) => <li>{item}</li>)}
                            </ol>

                        :
                        "Валидных email не найдено"
                   }
                   </div>
                </div>
                <div>
                    <h2 className={styles.sendNotificationPage__protocolHeading}>Введите список telegram chat</h2>
                    <AppTextArea
                        className={styles.sendNotificationPage__textarea}
                        id={'telegram'}
                        name={'telegram'}
                        value={telegramInput}
                        onChange={(e) => setTelegramInput(e.target.value)}
                    />
                    <h2 className={styles.sendNotificationPage__protocolHeading}>Обнаруженные telegram chat</h2>
                    <div className={styles.sendNotificationPage__outputData}>
                    {telegramOutput.length > 0 ?
                        <ol className={styles.sendNotificationPage__list}>
                            {telegramOutput.map((item) => <li >{item}</li>)}
                        </ol>
                        :
                        "Валидных telegram чатов не найдено"
                    }
                    </div>
                </div>
            </div>
           <AppButton type={"button"} value={'Отправить'} onClick={sendNotification}/>
        </div>
    );
};

export default SendNotificationPage;