import React, {useEffect} from 'react';
import styles from "../EventPage.module.scss"
import {useNavigate} from "react-router-dom";
import {useUserStore} from "@/store/userStore/useUserStore.ts";
import {useSynoraEventStore} from "@/store/eventStore/useSynoraEventStore.ts";
import SynoraEvent from "../../../models/SynoraEvent/SynoraEvent";
import AppInput from "../../../components/Input/AppInput";
import {successful, unsuccessful} from "@/components/UI/Toast/Toast";
import {useProjectStore} from "@/store/projectStore/useProjectStore.ts";
import AppButton from "../../../components/UI/AppButton/AppButton";
import {TelegramTemplate} from "@/models/Template/TelegramTemplate.ts";
import EmailTemplate from "../../../models/Template/EmailTemplate";
import TelegramTransport from "../../../models/Transport/TelegramTransport";
import EmailTransport from "../../../models/Transport/IEmailTransport";
import {ITransport} from "@/models/Transport/ITransport.ts";
import {ITemplate} from "@/models/Template/ITemplate.ts";
import {ISynoraEvent} from "@/models/SynoraEvent/ISynoraEvent.ts";
import SynoraEventService from "../../../services/SynoraEventService";

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

    const userId = useUserStore(state => state.userId)();
    const projectId = useProjectStore(state => state.currentProject?.id) || '';
    const navigate = useNavigate();
    const addConfigToEvent = useSynoraEventStore(state => state.addConfigToEvent);
    const fetchEvents = useSynoraEventStore(state => state.fetchEvents);

    const newSynoraEvent: SynoraEvent = new SynoraEvent(
        props.synoraEventName,
        userId,
        projectId
    );

    let currentSynoraEvent: ISynoraEvent | undefined = undefined;

    useEffect(() => {
        !!props.currentEvent && (currentSynoraEvent = props.currentEvent);
    }, []);


    const createAndAddConfig = async (e: React.MouseEvent<HTMLButtonElement>, sending: boolean) => {
        e.preventDefault();
        if (!currentSynoraEvent) {
            try {
                await createEvent();
            }
            catch(e) {
                unsuccessful('Не удалось создать event')
            }
        }
        await saveAllConfigs(sending);
    }


    const createEvent = async () => {
        const response = await SynoraEventService.createEvent(newSynoraEvent);
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                useSynoraEventStore.getState().addEvent(response.data);
                currentSynoraEvent = response.data;
                successful('Событие создано');
            } else {
                unsuccessful(`Ошибка создания: ${response.statusText}`)
            }
        }
    }

const saveConfig = async (transport: ITransport | undefined, template: ITemplate | undefined) => {
    console.log(`event: ${currentSynoraEvent}`)
    if (currentSynoraEvent && transport && template)
        try {
            return await addConfigToEvent(currentSynoraEvent, transport, template);
        } catch (e) {
            unsuccessful((e as Error).message);
            return false
        }
    return false
}

const saveTelegramConfig = async () => {
    return saveConfig(props.chosenTelegramTransport, props.chosenTelegramTemplate);

}

const saveEmailConfig = async () => {
    return saveConfig(props.chosenEmailTransport, props.chosenEmailTemplate);
}

const saveAllConfigs = async (sending: boolean) => {
    const emailConfigSaved = await saveEmailConfig()
    const telegramConfigSaved = await saveTelegramConfig()
    await fetchEvents();
    if (emailConfigSaved || telegramConfigSaved) {
        navigate(
            sending ?
                `/events/sendnotification/${currentSynoraEvent?.id}` :
                `/events`
        )
    } else {
        unsuccessful('Что то не так с навигацией')
    }
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
                                `${props.chosenEmailTemplate.body.body.slice(0, 50)}...` :
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
                                `${props.chosenTelegramTemplate.body.body.slice(0, 50)}...` :
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
        </div>
    </div>
)
}
;
export default CreateSynoraEventPage;