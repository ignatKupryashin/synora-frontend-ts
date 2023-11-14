import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
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
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState('');
    const [telegramInput, setTelegramInput] = useState('');
    const [currentEvent, setCurrentEvent] = useState(useSynoraEventStore.getState().events.filter((item) => item.id == currentEventId)[0])
    const synoraEventStore = useSynoraEventStore.getState().events;
    const [emailOutput, setEmailOutput] = useState<string[]>([]);
    const [telegramOutput, setTelegramOutput] = useState<string[]>([]);
    const firstUpdate = useRef(true);

    //написать дебаунс
    useEffect(() => {
        const data = emailInput
            // .replace(/\s/g, "")
            .split(/\r?\n/)
            .filter((item) => emailExpression.test(item))
        setEmailOutput(data)
    }, [emailInput]);

    //написать дебаунс
    useEffect(() => {

        const data = telegramInput.split(/\r?\n/)
        //Здесь может быть возможен минус в начале
            // .filter((item) => (+item))
            // .filter((item) => (Math.floor(Number(item)) === Number(item)));
        setTelegramOutput([...data])
        // data.forEach((item) => {
        //     +item && setTelegramOutput([...telegramOutput, item]);
        // })
    }, [telegramInput]);

    //разобраться как сделать так, чтобы при первом рендере не изменялось
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return
        }
        navigate('/events')
    }, [projectId]);

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
                successful('Рассылка успешно отправлена');
                navigate("/")
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

            {/*<p>{currentEvent?.event_code}</p>*/}

            <div className={styles.sendNotificationPage__protocolWrapper}>
                <div>
                    <h2 className={styles.sendNotificationPage__protocolHeading}>Введите список email. Каждый email c новой строки</h2>
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
                    <h2 className={styles.sendNotificationPage__protocolHeading}>Введите список telegram chat. Каждый чат с новой строки</h2>
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