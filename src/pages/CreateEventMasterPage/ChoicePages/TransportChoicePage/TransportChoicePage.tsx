import React from 'react';
import {ITemplate} from "../../../../models/Template/ITemplate";
import AppButton from "../../../../components/UI/AppButton/AppButton";
import styles from "../../CreateEventMasterPage.module.scss";
import {ITransport} from "../../../../models/Transport/ITransport";
import TelegramTransport from "../../../../models/Transport/TelegramTransport";
import EmailTransport from "../../../../models/Transport/IEmailTransport";
import TelegramTransportChoiceItem from "./TelegramTransportChoiceItem";
import EmailTransportChoiceItem from "./EmailTransportChoiceItem";
import {useTransportStore} from "../../../../store/transportStore/useTransportStore";

interface TransportChoicePageProps {
    chosenTelegramTransport: TelegramTransport | undefined;
    setChosenTelegramTransport: React.Dispatch<React.SetStateAction<TelegramTransport | undefined>>;
    chosenEmailTransport: EmailTransport | undefined;
    setChosenEmailTransport: React.Dispatch<React.SetStateAction<EmailTransport | undefined>>;
    setViewItem: React.Dispatch<React.SetStateAction<ITemplate | ITransport | undefined>>;
    setViewItemIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    chosenEmailTemplate: boolean;
    chosenTelegramTemplate: boolean;
    createTransport: React.Dispatch<React.SetStateAction<boolean>>
}




const TransportChoicePage = (props: TransportChoicePageProps) => {

const transports = useTransportStore(state => state.transports);
    const chooseTemplate = (targetTransport: ITransport) => {
        if (targetTransport.protocol_name === "telegram") {
            props.setChosenTelegramTransport(
                (targetTransport.id !== props.chosenTelegramTransport?.id)
                    ? targetTransport as TelegramTransport
                    : undefined
            )

        } else {
            props.setChosenEmailTransport(
                (targetTransport.id !== props.chosenEmailTransport?.id)
                    ? targetTransport as EmailTransport
                    : undefined
            )
        }
    }



    return (
        <div>
            <p className={styles.choicePage__discription}>Вы можете выбрать по одному шаблону каждого протокола (E-mail и/или Telegram) для события</p>
            <div className={styles.choicePage__createButtonBlock}>
                <AppButton appStyle={"transparent"} type={"button"} value={"Создать транспорт"} onClick={() => props.createTransport(true)}/>
            </div>
            <div>
                {transports.length > 0 ?
                    transports.map((item) =>
                        (item.protocol_name === "telegram")
                            ? props.chosenTelegramTemplate && <TelegramTransportChoiceItem
                                key={item.id}
                                transport={item as TelegramTransport}
                                chosen={item.id === props.chosenTelegramTransport?.id}
                                protocolIsChosen={!!props.chosenTelegramTransport}
                                onClick={() => chooseTemplate(item)}
                                onView={() => {props.setViewItem(item)
                                    props.setViewItemIsVisible(true)}}
                            />
                            : props.chosenEmailTemplate && <EmailTransportChoiceItem
                                key={item.id}
                                transport={item as EmailTransport}
                                chosen={item.id === props.chosenEmailTransport?.id}
                                protocolIsChosen={!!props.chosenEmailTransport}
                                onClick={() => chooseTemplate(item)}
                                onView={() => {
                                    props.setViewItem(item)
                                    props.setViewItemIsVisible(true);
                                }}
                            />
                    )
                    :
                    <p>У вас пока нет созданных шаблонов</p>
                }
            </div>

        </div>
    );
};



export default TransportChoicePage;