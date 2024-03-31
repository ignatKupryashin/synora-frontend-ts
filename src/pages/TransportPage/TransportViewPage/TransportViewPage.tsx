import React, {useEffect, useState} from 'react';
import TabBar from "../../../components/TabBar/TabBar";
import styles from "./TransportViewPage.module.scss";
import {TabBarItem} from "../../../components/TabBar/TabBarItem";
import {ITransport} from "../../../models/Transport/ITransport";
import EmailTransport from "../../../models/Transport/IEmailTransport";
import TelegramTransport from "../../../models/Transport/TelegramTransport";

interface TransportViewPageProps {
    viewItem: ITransport | undefined;
}

/**
 * @param props.viewItem Просматриваемый транспорт
 * @constructor
 */
function TransportViewPage (props: TransportViewPageProps) {
    //Список вкладок
    const [tabsArray, setTabsArray] = useState<TabBarItem[]>([]);
    useEffect(() => {
        if (props.viewItem) {
            setTabsArray(
                [{
                    title: props.viewItem.protocol_name,
                    content: (
                        (props.viewItem.protocol_name === 'email') ? (
                            <div>
                            <h2 className={styles.tabContent__heading}>{props.viewItem.transport_name}</h2>
                                <p className={styles.tabContent__paragrah}>
                                    Имя отправителя: {(props.viewItem as EmailTransport).transport_configs.EMAIL_FROM_NAME}<br/>
                                    E-mail отправителя: {(props.viewItem as EmailTransport).transport_configs.EMAIL_FROM} <br/>
                                    Логин: {(props.viewItem as EmailTransport).transport_configs.USERNAME} <br/>
                                    Пароль: {(props.viewItem as EmailTransport).transport_configs.PASSWORD} <br/>
                                    Сервер: {(props.viewItem as EmailTransport).transport_configs.EMAIL_SERVER} <br/>
                                    Порт: {(props.viewItem as EmailTransport).transport_configs.EMAIL_PORT}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2 className={styles.tabContent__heading}>{props.viewItem.transport_name}</h2>
                                <p className={styles.tabContent__paragrah}>
                                    Токен бота: {(props.viewItem as TelegramTransport).transport_configs.TOKEN}
                                </p>
                            </div>
                        )

                    )
                }
                ]
            )
        }
        else {
            setTabsArray([]);
        }
    }, [props.viewItem]);

    return (
        <div>
            <TabBar barArray={tabsArray}/>
        </div>
    );
}

export default TransportViewPage;