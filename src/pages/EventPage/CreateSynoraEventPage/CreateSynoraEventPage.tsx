import React, {useEffect, useState} from 'react';
import styles from "../EventPage.module.scss"
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../../store/userStore/useUserStore";
import {useSynoraEventStore} from "../../../store/eventStore/useSynoraEventStore";
import SynoraEvent from "../../../models/SynoraEvent/SynoraEvent";
import AppInput from "../../../components/Input/AppInput";
import {useFetching} from "../../../hooks/useFetching";
import {successful, unsuccessful} from "components/UI/Toast/Toast";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";
import AppButton from "../../../components/UI/AppButton/AppButton";
import {TelegramTemplate} from "../../../models/Template/TelegramTemplate";
import EmailTemplate from "../../../models/Template/EmailTemplate";
import TelegramTransport from "../../../models/Transport/TelegramTransport";
import EmailTransport from "../../../models/Transport/IEmailTransport";
import {ITransport} from "../../../models/Transport/ITransport";
import {ITemplate} from "../../../models/Template/ITemplate";
import {ISynoraEvent} from "../../../models/SynoraEvent/ISynoraEvent";

interface CreateEventPageProps {
    synoraEventName: string;
    setSynoraEventName: React.Dispatch<React.SetStateAction<string>>;
    chosenEmailTemplate: EmailTemplate | undefined;
    chosenTelegramTemplate: TelegramTemplate | undefined;
    chosenTelegramTransport: TelegramTransport | undefined;
    chosenEmailTransport: EmailTransport | undefined;
    stepBack: () => void;
    currentEvent?: ISynoraEvent;
}


const CreateSynoraEventPage = (props: CreateEventPageProps) => {

    const sendEvent = useSynoraEventStore(state => state.createEvent);
    const userId = useUserStore(state => state.userId)();
    const projectId = useProjectStore(state => state.currentProject?.id) || '';
    const navigate = useNavigate();
    const addConfigToEvent = useSynoraEventStore(state => state.addConfigToEvent);
    const fetchEvents = useSynoraEventStore(state => state.fetchEvents);
    const [willSend, setWillSend] = useState(false);

    const newSynoraEvent: SynoraEvent = new SynoraEvent(
        props.synoraEventName,
        userId,
        projectId
    );

    const [currentSynoraEvent, setCurrentSynoraEvent] = useState<ISynoraEvent | undefined>(undefined)

    useEffect(() => {
        !!props.currentEvent && setCurrentSynoraEvent(props.currentEvent);
    }, []);


    const [mySendEvent,
        sendEventIsLoading] = useFetching(
        () => sendEvent(newSynoraEvent))


    const createAndAddConfig  = async (e: React.MouseEvent<HTMLButtonElement>, sending: boolean)=> {
        e.preventDefault();
        !currentSynoraEvent && await createEvent(sending);
        await saveAllConfigs();
    }



    const createEvent = async (sending: boolean) => {
        await mySendEvent().then(async (response) => {
            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    setCurrentSynoraEvent(response.data);
                    successful('Событие создано');
                    setWillSend(sending);
                } else {
                    unsuccessful(`Ошибка создания: ${response.data.detail}`)
                }
            }
        })
    }


    const saveConfig = async (transport: ITransport | undefined, template: ITemplate | undefined) => {
        if (currentSynoraEvent && transport && template)
            try {
                return await addConfigToEvent(currentSynoraEvent, transport, template);
            } catch (e) {
                unsuccessful((e as Error).message);
            }
        return undefined
    }

    const saveTelegramConfig = async () => {
        return saveConfig(props.chosenTelegramTransport, props.chosenTelegramTemplate);

    }

    const saveEmailConfig = async () => {
        return saveConfig(props.chosenEmailTransport, props.chosenEmailTemplate);
    }

    const saveAllConfigs = async () => {
        let emailConfigSaved = await saveEmailConfig()
        let telegramConfigSaved = await saveTelegramConfig()

        const fetchAndSendEventPromises = [
            await fetchEvents()
        ]
        const fetched = await Promise.all(fetchAndSendEventPromises)
        fetched && (!!emailConfigSaved || !!telegramConfigSaved) &&
        navigate(
            willSend ?
                `/events/sendnotification/${currentSynoraEvent?.id}` :
                `/events`
        )
    }


    const changeEventName = (e: React.FormEvent<HTMLInputElement>) => {
        props.setSynoraEventName(e.currentTarget.value);
    }


    return (
        <div className={styles.event}>
            <div className={styles.event__form}>
                <AppInput
                    id={'eventName'}
                    label={'Наименование рассылки:'}
                    type={'text'}
                    name={'eventName'}
                    placeholder={'Введите наименование рассылки'}
                    value={props.synoraEventName}
                    onChange={changeEventName}
                />

                {
                    !!props.chosenEmailTemplate && props.chosenEmailTransport &&
                    <div className={styles.event__protocolBlock}>
                        <h4 className={styles.event__protocolBlock__heading}>Email</h4>
                        <div className={styles.event__protocolBlock__item}>
                            <p className={styles.event__protocolBlock__itemName}>
                                {props.chosenEmailTemplate.template_name}</p>
                            <p className={styles.event__protocolBlock__itemDiscription}>
                                {props.chosenEmailTemplate.body.body.length > 50 ?
                                    `${props.chosenEmailTemplate.body.body.slice(0,50)}...` :
                                    props.chosenEmailTemplate.body.body
                                }
                            </p>
                        </div>
                        <div className={styles.event__protocolBlock__item}>
                            <p className={styles.event__protocolBlock__itemName}>
                                {props.chosenEmailTransport.transport_name}</p>
                            <p className={styles.event__protocolBlock__itemDiscription}>
                                {`Тема: ${props.chosenEmailTemplate.letter_topic}`}
                            </p>
                        </div>
                    </div>
                }


                {
                    !!props.chosenTelegramTemplate && props.chosenTelegramTransport &&
                    <div className={styles.event__protocolBlock}>
                        <h4 className={styles.event__protocolBlock__heading}>Telegram</h4>
                        <div className={styles.event__protocolBlock__item}>
                            <p className={styles.event__protocolBlock__itemName}>
                            {props.chosenTelegramTemplate.template_name}</p>
                            <p className={styles.event__protocolBlock__itemDiscription}>
                               {props.chosenTelegramTemplate.body.body.length > 50 ?
                                   `${props.chosenTelegramTemplate.body.body.slice(0,50)}...` :
                               props.chosenTelegramTemplate.body.body
                               }
                            </p>
                        </div>
                        <div className={styles.event__protocolBlock__item}>
                            <p className={styles.event__protocolBlock__itemName}>
                                {props.chosenTelegramTransport.transport_name}</p>
                            <p className={styles.event__protocolBlock__itemDiscription}>
                                Телеграм
                            </p>
                        </div>
                    </div>
                }

                <div className={styles.event__buttonblock}>
                    <AppButton
                        type={'button'}
                        value={'Предыдущий шаг'}
                        appStyle="white"
                        onClick={props.stepBack}
                    />
                    <AppButton
                        type={'button'}
                        value={'Создать без отправки'}
                        disabled={!props.synoraEventName}
                        appStyle="transparent"
                        onClick={(e) => createAndAddConfig(e, false)}
                    />
                    <AppButton
                        type={'button'}
                        value={'Перейти к отправке'}
                        disabled={!props.synoraEventName}
                        onClick={(e) => createAndAddConfig(e, true)}
                    />
                </div>
                {
                    sendEventIsLoading && <h1>Идет отправка</h1>
                }

            </div>
        </div>
    )
};
export default CreateSynoraEventPage;