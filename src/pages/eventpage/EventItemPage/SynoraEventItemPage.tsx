import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useSynoraEventStore} from "../../../store/eventStore/useSynoraEventStore";
import {ISynoraEvent} from "../../../models/SynoraEvent/ISynoraEvent";
import {useTransportStore} from "../../../store/transportStore/useTransportStore";
import {ITransport} from "../../../models/Transport/ITransport";
import {ITemplate} from "../../../models/Template/ITemplate";
import {useTemplateStore} from "../../../store/templateStore/useTemplateStore";
import AppSelect, {AppSelectOption} from "../../../components/UI/AppSelect/AppSelect";
import {useProjectStore} from "../../../store/projectStore/useProjectStore";
import styles from "./SynoraEventItemPage.module.scss"
import AppButton from "../../../components/UI/AppButton/AppButton";
import {successful, unsuccessful} from "../../../components/UI/Toast/Toast";


const SynoraEventItemPage: FC = () => {

    const currentProject = useProjectStore.getState().currentProject;
    const navigate = useNavigate();
    let firstRender = useRef(true);


    const templates = useTemplateStore.getState().templates;
    const transports = useTransportStore.getState().transports;

    const {synoraEventId} = useParams();
    const synoraEvent: ISynoraEvent = useSynoraEventStore.getState().events.filter((item) => item.id === synoraEventId)[0];
    const telegramTransports: ITransport[] = transports ? transports.filter((item) => item.protocol_name === "telegram") : [];
    const emailTransports: ITransport[] = transports ? transports.filter((item) => item.protocol_name === "email") : [];
    const telegramTemplates: ITemplate[] = templates ? templates.filter((item) => item.protocol_name === "telegram") : [];
    const emailTemplates: ITemplate[] = templates ? templates.filter((item) => item.protocol_name === "email") : [];


    const telegramTemplateOptions: AppSelectOption<ITemplate | undefined>[] = [];
    telegramTemplateOptions.push({
        value: undefined,
        label: '--Нет шаблона--'
    })
    telegramTemplates.map((item) => telegramTemplateOptions.push({
        value: item,
        label: item.template_name
    }))


    const emailTemplateOptions: AppSelectOption<ITemplate | undefined>[] = [];
    emailTemplateOptions.push({
        value: undefined,
        label: '--Нет шаблона--'
    })
    emailTemplates.map((item) => emailTemplateOptions.push({
        value: item,
        label: item.template_name
    }))


    const emailTransportOptions: AppSelectOption<ITransport | undefined>[] = [];
    emailTransportOptions.push({
        value: undefined,
        label: '--Нет транспорта--'
    })
    emailTransports.map((item) => emailTransportOptions.push({
        value: item,
        label: item.transport_name
    }))


    const telegramTransportOptions: AppSelectOption<ITransport | undefined>[] = [];
    telegramTransportOptions.push({
        value: undefined,
        label: '--Нет транспорта--'
    })
    telegramTransports.map((item) => telegramTransportOptions.push({
        value: item,
        label: item.transport_name
    }))


    const [currentTelegramTemplate, setCurrentTelegramTemplate] = useState<ITemplate | undefined>(undefined);
    const [currentEmailTemplate, setCurrentEmailTemplate] = useState<ITemplate | undefined>(undefined);
    const [currentTelegramTransport, setCurrentTelegramTransport] = useState<ITransport | undefined>(undefined);
    const [currentEmailTransport, setCurrentEmailTransport] = useState<ITransport | undefined>(undefined);


    //Чтобы при изменении проекта возвращало на страницу events
    useEffect(() => {
        if (!firstRender.current) {
            navigate('/events');
        } else {
            firstRender.current = false
        }
    }, [currentProject]);

    const addConfigToEvent = useSynoraEventStore.getState().addConfigToEvent;


    const saveConfig = async (transport: ITransport | undefined, template: ITemplate | undefined)=> {
        if (synoraEvent && transport && template)
            try {
                await addConfigToEvent(synoraEvent, transport, template);
                successful('Шаблон и транспорт успешно добавлены')
            }
            catch (e) {
                unsuccessful((e as Error).message);
            }
        else {
            unsuccessful('Не все поля заполнены')
        }
    }

    const saveTelegramConfig = async () => {
       await saveConfig(currentTelegramTransport, currentTelegramTemplate);
    }

    const saveEmailConfig = async () => {
       await saveConfig(currentEmailTransport, currentEmailTemplate)
    }


    return (
        <div>
            {synoraEvent ?

                <div className={styles.synoraEventItemPage}>
                    <h1 className={styles.synoraEventItemPage__heading}>{synoraEvent.event_code}</h1>
                    <p className={styles.synoraEventItemPage__eventId}>id: {synoraEvent.id}</p>
                    <div className={styles.synoraEventItemPage__protocols}>
                        <div className={styles.synoraEventItemPage__protocolWrapper}>
                            <h2 className={styles.synoraEventItemPage__protocolHeading}>Telegram:</h2>
                            <AppSelect
                                value={currentTelegramTemplate}
                                options={telegramTemplateOptions}
                                onChange={(e) => setCurrentTelegramTemplate(e.target.value)}
                                placeholder={"Теле2"}
                                label={'Шаблон для Телеграма'}
                                width={'300px'}
                            />
                            <AppSelect
                                value={currentTelegramTransport}
                                options={telegramTransportOptions}
                                onChange={(e) => setCurrentTelegramTransport(e.target.value)}
                                label={'Транспорт Телеграм'}
                                width={'300px'}
                            />
                            <AppButton type={"button"} value={"Сохранить"} onClick={saveTelegramConfig}/>
                        </div>
                        <div className={styles.synoraEventItemPage__divider}></div>
                        <div className={styles.synoraEventItemPage__protocolWrapper}>
                            <h2 className={styles.synoraEventItemPage__protocolHeading}>Email:</h2>
                            <AppSelect
                                value={currentEmailTemplate}
                                options={emailTemplateOptions}
                                onChange={(e) => setCurrentEmailTemplate(e.target.value)}
                                label={'Шаблон для email'}
                                width={'300px'}
                            />

                            <AppSelect
                                value={currentEmailTransport}
                                options={emailTransportOptions}
                                onChange={(e) => setCurrentEmailTransport(e.target.value)}
                                label={'Транспорт email'}
                                width={'300px'}
                            />
                            <AppButton type={"button"} value={"Сохранить"} onClick={saveEmailConfig}/>
                        </div>
                    </div>
                    <AppButton type={"button"} value={'Перейти к отправке рассылки'} onClick={() => navigate(`/events/sendnotification/${synoraEvent.id}`)}/>
                </div>

                : "События с таким id не существует"
            }
        </div>
    );
};

export default SynoraEventItemPage;