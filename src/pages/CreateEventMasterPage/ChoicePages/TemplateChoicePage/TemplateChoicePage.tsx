import React from 'react';
import {ITemplate} from "../../../../models/Template/ITemplate";
import {TelegramTemplate} from "../../../../models/Template/TelegramTemplate";
import EmailTemplate from "../../../../models/Template/EmailTemplate";
import AppButton from "../../../../components/UI/AppButton/AppButton";
import TelegramTemplateChoiceItem from "./TelegramTemplateChoiceItem";
import EmailTemplateChoiceItem from "./EmailTemplateChoiceItem,";
import styles from "../../CreateEventMasterPage.module.scss";
import {ITransport} from "../../../../models/Transport/ITransport";
import {useTemplateStore} from "../../../../store/templateStore/useTemplateStore";

interface TemplateChoicePageProps {
    chosenTelegramTemplate: TelegramTemplate | undefined;
    setChosenTelegramTemplate: React.Dispatch<React.SetStateAction<TelegramTemplate | undefined>>;
    chosenEmailTemplate: EmailTemplate | undefined;
    setChosenEmailTemplate: React.Dispatch<React.SetStateAction<EmailTemplate | undefined>>;
    setViewItem: React.Dispatch<React.SetStateAction<ITemplate | ITransport | undefined>>;
    setViewItemIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    createTemplate: React.Dispatch<React.SetStateAction<boolean>>
}


const TemplateChoicePage = (props: TemplateChoicePageProps) => {

    const templates = useTemplateStore(state => state.templates);

    const chooseTemplate = (targetTemplate: ITemplate) => {
        if (targetTemplate.protocol_name === "telegram") {
            props.setChosenTelegramTemplate(
                (targetTemplate.id !== props.chosenTelegramTemplate?.id)
                    ? targetTemplate as TelegramTemplate
                    : undefined
            )

        } else {
            props.setChosenEmailTemplate(
                (targetTemplate.id !== props.chosenEmailTemplate?.id)
                    ? targetTemplate as EmailTemplate
                    : undefined
            )
        }
    }

    return (
                <div>
                        <><p className={styles.choicePage__discription}>Вы можете выбрать по одному шаблону каждого
                            протокола
                            (E-mail и/или Telegram) для события</p>
                            <div className={styles.choicePage__createButtonBlock}>
                                <AppButton appStyle={"transparent"} type={"button"} value={"Создать шаблон"} onClick={() => props.createTemplate(true)}/>
                            </div>
                            <div>
                                {templates.length > 0 ?
                                    templates.map((item) => (item.protocol_name === "telegram")
                                        ? <TelegramTemplateChoiceItem
                                            key={item.id}
                                            template={item as TelegramTemplate}
                                            chosen={item.id === props.chosenTelegramTemplate?.id}
                                            protocolIsChosen={!!props.chosenTelegramTemplate}
                                            onClick={() => chooseTemplate(item)}
                                            onView={() => {
                                                props.setViewItem(item);
                                                props.setViewItemIsVisible(true);
                                            }}/>
                                        : <EmailTemplateChoiceItem
                                            key={item.id}
                                            template={item as EmailTemplate}
                                            chosen={item.id === props.chosenEmailTemplate?.id}
                                            protocolIsChosen={!!props.chosenEmailTemplate}
                                            onClick={() => chooseTemplate(item)}
                                            onView={() => {
                                                props.setViewItem(item);
                                                props.setViewItemIsVisible(true);
                                            }}/>
                                    )
                                    :
                                    <p>У вас пока нет созданных шаблонов</p>}
                            </div>
                        </>
                </div>
    );
};



export default TemplateChoicePage;